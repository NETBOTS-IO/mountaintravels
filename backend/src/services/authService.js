import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel.js';
import { sendEmail } from '../utils/email.js';

class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    this.refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;
  }

  // Generate JWT token
  generateToken(userId, role) {
    return jwt.sign({ userId, role }, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
  }

  // Generate refresh token
  generateRefreshToken(userId) {
    return jwt.sign({ userId, type: 'refresh' }, this.jwtSecret, { expiresIn: this.refreshTokenExpiresIn });
  }

  // Verify JWT token
  verifyToken(token) {
    try { return jwt.verify(token, this.jwtSecret); }
    catch { return null; }
  }

  // ===== Login =====
  async login(email, password) {
    console.log("🔍 Login attempt:", email); // Log email (not password)
  
    // Look for user with role 'admin'
    const user = await User.findOne({ email: email.toLowerCase(), role: "admin" });
    console.log("👤 User found:", user ? { id: user._id, email: user.email, role: user.role } : null);
  
    if (!user) throw new Error("Invalid credentials"); // Ensures only admins can login
  
    if (!user.isActive) {
      console.warn("⚠️ User is deactivated:", user.email);
      throw new Error("Account is deactivated");
    }
  
    if (user.isLocked()) {
      const mins = Math.max(1, Math.ceil((user.lockedUntil - new Date()) / 1000 / 60));
      console.warn(`🔒 User account locked for ${mins} minutes:`, user.email);
      throw new Error(`Account is locked. Try again in ${mins} minutes`);
    }
  
    const valid = await user.comparePassword(password);
    console.log("✅ Password valid?", valid);
  
    if (!valid) {
      console.warn("❌ Invalid password attempt for:", user.email);
      await user.incrementFailedAttempts();
      throw new Error("Invalid credentials");
    }
  
    await user.resetFailedAttempts();
    console.log("🔄 Failed attempts reset for:", user.email);
  
    const accessToken = this.generateToken(user._id, user.role);
    const refreshToken = this.generateRefreshToken(user._id);
  
    console.log("🎟️ Tokens generated for:", user.email);
  
    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        permissions: user.getPermissions(),
        fullName: user.fullName,
        emailVerified: user.emailVerified,
      },
      accessToken,
      refreshToken,
    };
  }
  
  

  // ===== Email Verification =====
  async sendVerificationEmail(email, firstName, token) {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const subject = 'Verify Your Email - TourMaker Dashboard';
    const html = `
      <h2>Email Verification</h2>
      <p>Hello ${firstName},</p>
      <p>Please verify your email by clicking the button below:</p>
      <p><a href="${verifyUrl}" style="background:#16a34a;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Verify Email</a></p>
      <p>This link expires in 24 hours.</p>`;
      try {
        await sendEmail({
          from: `"Tour Maker Pakistan" <${process.env.SMTP_USER}>`,
          to: email,
          subject,
          html,
        });
      } catch (err) {
        console.error("Failed to send verification email:", err.message);
      }
  }

  async createAndAttachEmailVerificationToken(user) {
    const token = user.generateEmailVerificationToken();
    await user.save();
    await this.sendVerificationEmail(user.email, user.firstName, token);
    return token;
  }

  async verifyEmail(token) {
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      emailVerificationToken: hashed,
      emailVerificationExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error('Invalid or expired verification token');
    user.emailVerified = true;
    await user.clearEmailVerificationToken();
    return { message: 'Email verified successfully' };
  }

  async resendVerification(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error('User not found');
    if (user.emailVerified) throw new Error('Email already verified');
    return this.createAndAttachEmailVerificationToken(user);
  }

  // Refresh access token
  async refreshToken(refreshToken) {
    try {
      const decoded = this.verifyToken(refreshToken);
      if (!decoded || decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token');
      }

      const user = await User.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      const newAccessToken = this.generateToken(user._id, user.role);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw error;
    }
  }

  // Create new admin (admin only)
  async createAdmin(adminData, createdBy) {
    try {
      if (!adminData.email) {
        throw new Error("Email is required to create an admin");
      }

      // Check if creator has permission to create admins
      const creator = await User.findById(createdBy);
      if (!creator || !creator.canCreateAdmin()) {
        throw new Error('Unauthorized to create admin accounts');
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email: adminData.email.toLowerCase() });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Generate temporary password
      const tempPassword = crypto.randomBytes(8).toString('hex');

      // Create admin with custom permissions or default admin permissions
      const admin = new User({
        ...adminData,
        email: adminData.email.toLowerCase(),
        password: tempPassword,
        role: 'admin',
        createdBy: createdBy,
        // If specific permissions are provided, use them; otherwise use defaults
        permissions: adminData.permissions || {
          tours: true,
          blogs: true,
          gallery: true,
          testimonials: true,
          partnerFeedbacks: true,
          inquiries: true,
          userManagement: true,
          systemSettings: true
        }
      });

      await admin.save();

      // Send welcome email with temporary password
      await this.sendWelcomeEmail(admin.email, admin.firstName, tempPassword);

      return {
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          fullName: admin.fullName
        },
        tempPassword
      };
    } catch (error) {
      throw error;
    }
  }

  // Update admin permissions
  async updateAdminPermissions(adminId, permissions, updatedBy) {
    try {
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }

      // Check if updater has permission to manage users
      const updater = await User.findById(updatedBy);
      if (!updater || !updater.hasPermission('userManagement')) {
        throw new Error('Unauthorized to update permissions');
      }

      // Update permissions
      admin.permissions = { ...admin.permissions, ...permissions };
      await admin.save();

      return {
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          fullName: admin.fullName
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Update admin status
  async updateAdminStatus(adminId, isActive, updatedBy) {
    try {
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }

      // Check if updater has permission to manage users
      const updater = await User.findById(updatedBy);
      if (!updater || !updater.hasPermission('userManagement')) {
        throw new Error('Unauthorized to update admin status');
      }

      // Cannot deactivate yourself
      if (adminId.toString() === updatedBy.toString()) {
        throw new Error('Cannot deactivate your own account');
      }

      admin.isActive = isActive;
      await admin.save();

      return {
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          fullName: admin.fullName,
          isActive: admin.isActive
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Delete admin
  async deleteAdmin(adminId, deletedBy) {
    try {
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }

      // Check if deleter has permission to manage users
      const deleter = await User.findById(deletedBy);
      if (!deleter || !deleter.hasPermission('userManagement')) {
        throw new Error('Unauthorized to delete admin accounts');
      }

      // Cannot delete yourself
      if (adminId.toString() === deletedBy.toString()) {
        throw new Error('Cannot delete your own account');
      }

      await User.findByIdAndDelete(adminId);
      return { message: 'Admin deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Get all admins
  async getAllAdmins(requesterId) {
    try {
      const requester = await User.findById(requesterId);
      if (!requester || !requester.hasPermission('userManagement')) {
        throw new Error('Unauthorized to view all admins');
      }

      const admins = await User.find({}).select('-password -passwordResetToken -emailVerificationToken');
      return admins;
    } catch (error) {
      throw error;
    }
  }

  // Get admin by ID
  async getAdminById(adminId, requesterId) {
    try {
      const requester = await User.findById(requesterId);
      if (!requester) {
        throw new Error('Unauthorized');
      }

      // Admins can view their own profile or others if they have userManagement permission
      if (requesterId.toString() !== adminId.toString() && !requester.hasPermission('userManagement')) {
        throw new Error('Unauthorized to view this admin');
      }

      const admin = await User.findById(adminId).select('-password -passwordResetToken -emailVerificationToken');
      if (!admin) {
        throw new Error('Admin not found');
      }

      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Update admin profile
  async updateProfile(adminId, updateData) {
    try {
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }

      // Update allowed fields
      if (updateData.firstName) admin.firstName = updateData.firstName;
      if (updateData.lastName) admin.lastName = updateData.lastName;

      await admin.save();

      return {
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions,
          fullName: admin.fullName
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(adminId, currentPassword, newPassword) {
    try {
      const admin = await User.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      admin.password = newPassword;
      await admin.save();

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const admin = await User.findOne({ email: email.toLowerCase() });
      if (!admin) {
        // Don't reveal if email exists or not
        return { message: 'If an account with that email exists, a password reset link has been sent' };
      }

      if (!admin.isActive) {
        throw new Error('Account is deactivated');
      }

      // Generate reset token
      const resetToken = admin.generatePasswordResetToken();
      await admin.save();

      // Send reset email
      await this.sendPasswordResetEmail(admin.email, admin.firstName, resetToken);

      return { message: 'If an account with that email exists, a password reset link has been sent' };
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const admin = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });

      if (!admin) {
        throw new Error('Invalid or expired reset token');
      }

      // Update password and clear reset token
      admin.password = newPassword;
      await admin.clearPasswordResetToken();

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw error;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, firstName, tempPassword) {
    if (!email) {
      console.warn("Skipping welcome email: no recipient email provided.");
      return;
    }
    const subject = 'Welcome to TourMaker Dashboard - Admin Account';
    const html = `
      <h2>Welcome to TourMaker Dashboard!</h2>
      <p>Hello ${firstName},</p>
      <p>Your admin account has been created successfully. Here are your login credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please change your password after your first login for security.</p>
      <p>As an admin, you have access to manage the TourMaker dashboard based on your assigned permissions.</p>
      <p>Best regards,<br>TourMaker Team</p>
    `;

    try {
      await sendEmail({
        from: `"Tour Maker Pakistan" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        html,
      });
    } catch (err) {
      console.error("Failed to send welcome email:", err.message);
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, firstName, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const subject = 'Password Reset Request - TourMaker Dashboard';
    const html = `
      <h2>Password Reset Request</h2>
      <p>Hello ${firstName},</p>
      <p>You requested a password reset for your TourMaker Dashboard admin account.</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>TourMaker Team</p>
    `;

    try {
      await sendEmail({
        from: `"Tour Maker Pakistan" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        html,
      });
    } catch (err) {
      console.error("Failed to send password reset email:", err.message);
    }
  }

  // Verify admin permissions
  async verifyPermission(adminId, permission) {
    try {
      const admin = await User.findById(adminId, "role permissions isActive");
      if (!admin || !admin.isActive) {
        return false;
      }

      return !!admin.hasPermission(permission);
    } catch (error) {
      console.error("Permission check failed:", error);
      return false;
    }
  }
}

export default new AuthService();