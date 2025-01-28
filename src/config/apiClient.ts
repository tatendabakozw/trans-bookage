// src/lib/apiClient.ts

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API wrapper functions
export const api = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};

// Error handler
const handleApiError = (error: AxiosError): Error => {
  if (error.response) {
    const message = (error.response.data as any)?.message || 'An error occurred';
    return new Error(message);
  }
  return new Error(error.message || 'Network error');
};

export default api;