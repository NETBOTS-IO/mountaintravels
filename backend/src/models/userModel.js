import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, maxlength: 50 },
  role: { type: String, enum: ['admin'], default: 'admin' },
  permissions: {
    tours: { type: Boolean, default: true },
    blogs: { type: Boolean, default: true },
    gallery: { type: Boolean, default: true },
    testimonials: { type: Boolean, default: true },
    partnerFeedbacks: { type: Boolean, default: true },
    inquiries: { type: Boolean, default: true },
    userManagement: { type: Boolean, default: true },
    systemSettings: { type: Boolean, default: true }
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpires: { type: Date, default: null }
}, { timestamps: true });

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

// Pre-save password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Lock check
userSchema.methods.isLocked = function() {
  return this.lockedUntil && new Date() < this.lockedUntil;
};

// Permissions - simplified since all users are admins
userSchema.methods.hasPermission = function(permission) {
  // All users are admins, so check the specific permission
  return this.permissions[permission] === true;
};

userSchema.methods.getPermissions = function() {
  return this.permissions;
};

// Admin creation permission - check if user can create other admins
userSchema.methods.canCreateAdmin = function() {
  return this.isActive && this.permissions.userManagement === true;
};

// Failed attempts
userSchema.methods.incrementFailedAttempts = function() {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
  }
  return this.save();
};

userSchema.methods.resetFailedAttempts = function() {
  this.failedLoginAttempts = 0;
  this.lockedUntil = null;
  this.lastLogin = new Date();
  return this.save();
};

// Password reset
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  return resetToken;
};

userSchema.methods.clearPasswordResetToken = function() {
  this.passwordResetToken = null;
  this.passwordResetExpires = null;
  return this.save();
};

// Email verification
userSchema.methods.generateEmailVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return token;
};

userSchema.methods.clearEmailVerificationToken = function() {
  this.emailVerificationToken = null;
  this.emailVerificationExpires = null;
  return this.save();
};

// Virtuals
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// toJSON cleanup
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.emailVerificationToken;
    delete ret.failedLoginAttempts;
    delete ret.lockedUntil;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);
export default User;