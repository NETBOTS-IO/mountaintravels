import { User } from '@/lib/types';
import axios, { AxiosInstance } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProfile: (profileData: { firstName: string; lastName: string }) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  
  // Permission checks - Updated to match backend logic
  hasPermission: (permission: keyof User['permissions']) => boolean;
  hasAnyPermission: (permissions: (keyof User['permissions'])[]) => boolean;
  hasAllPermissions: (permissions: (keyof User['permissions'])[]) => boolean;
  isAdmin: () => boolean;
  canCreateAdmin: () => boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email,
            password,
          });

          const data = response.data;

          if (data.success && data.data) {
            const { user, accessToken, refreshToken } = data.data;
            
            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return true;
          } else {
            throw new Error(data.message || 'Invalid response format');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Login failed";
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
          });
          return false;
        }
      },

      // Logout action
      logout: async () => {
        try {
          // Call logout endpoint to log the event
          await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, {
            headers: {
              Authorization: `Bearer ${get().accessToken}`
            }
          });
        } catch (error) {
          // Continue with logout even if API call fails
          console.warn('Logout API call failed:', error);
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      // Refresh access token
      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) return false;

          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
            refreshToken,
          });

          const data = response.data;

          if (data.success && data.data.accessToken) {
            set({ accessToken: data.data.accessToken, error: null });
            return true;
          } else {
            get().clearAuth();
            return false;
          }
        } catch (error: any) {
          get().clearAuth();
          return false;
        }
      },

      // Update user profile
      updateProfile: async (profileData: { firstName: string; lastName: string }) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.put<any>(`/api/auth/profile`, profileData);
          const data = response.data;

          if (data.success && data.data.user) {
            set({ 
              user: data.data.user,
              isLoading: false,
              error: null 
            });
            return true;
          } else {
            throw new Error(data.message || 'Failed to update profile');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Failed to update profile";
          set({ isLoading: false, error: errorMessage });
          return false;
        }
      },

      // Change password
      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiClient.put<any>(`/api/auth/change-password`, {
            currentPassword,
            newPassword,
          });

          const data = response.data;

          if (data.success) {
            set({ isLoading: false, error: null });
            get().logout();
            return true;
          } else {
            throw new Error(data.message || 'Failed to change password');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Failed to change password";
          set({ isLoading: false, error: errorMessage });
          return false;
        }
      },

      // Set user data
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      // Set tokens
      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken, isAuthenticated: true });
      },

      // Clear authentication
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Set error
      setError: (error: string | null) => {
        set({ error });
      },

      // Permission checks - Updated to match backend logic
      hasPermission: (permission: keyof User["permissions"]) => {
        const { user } = get();
        if (!user || !user.isActive) return false;
        // Since all users are admins, check specific permission
        return user.permissions[permission] === true;
      },

      hasAnyPermission: (permissions: (keyof User["permissions"])[]) => {
        const { user } = get();
        if (!user || !user.isActive) return false;
        return permissions.some((p) => user.permissions[p] === true);
      },

      hasAllPermissions: (permissions: (keyof User["permissions"])[]) => {
        const { user } = get();
        if (!user || !user.isActive) return false;
        return permissions.every((p) => user.permissions[p] === true);
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },

      canCreateAdmin: () => {
        const { user } = get();
        return user?.isActive === true && user?.permissions.userManagement === true;
      },
    }),
    {
      name: 'tourmaker-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ---------------------------
// Axios API Client
// ---------------------------
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor → refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshAccessToken, clearAuth } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } else {
        clearAuth();
        // Redirect to login page could be handled here
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// API Client Wrapper with enhanced error handling
export const apiClient = {
  get: <T>(url: string, config = {}) => api.get<T>(url, config),
  post: <T>(url: string, data?: any, config = {}) => api.post<T>(url, data, config),
  put: <T>(url: string, data?: any, config = {}) => api.put<T>(url, data, config),
  delete: <T>(url: string, config = {}) => api.delete<T>(url, config),
  patch: <T>(url: string, data?: any, config = {}) => api.patch<T>(url, data, config),
};