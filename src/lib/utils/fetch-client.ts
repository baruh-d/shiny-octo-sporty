// lib/fetch-client.ts
import { Toast } from '@/components/ui/toast';

type FetchOptions = RequestInit & {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    showErrorToast = true,
    showSuccessToast = false,
    // successMessage = 'Operation successful',
    ...fetchOptions
  } = options;

  // Set default headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Set default options
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers,
  };

  // Combine options
  const fetchOpts = {
    ...defaultOptions,
    ...fetchOptions,
    headers,
  };

  try {
    // Add URL prefix for relative URLs
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    // Make the request
    const response = await fetch(url, fetchOpts);

    // Handle successful responses
    if (response.ok) {
      // Show success toast if requested
      if (showSuccessToast) {
        Toast({
          title: 'Success',
        //   description: successMessage,
        });
      }

      // For 204 No Content, return empty object
      if (response.status === 204) {
        return {} as T;
      }

      // Parse response based on content type
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json() as T;
      } else {
        // For non-JSON responses, return the raw response
        return response as unknown as T;
      }
    }

    // Handle error responses
    let errorData: { message?: string } = {};
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
      errorData = { message: response.statusText || 'An error occurred' };
    }

    // Show error toast
    if (showErrorToast) {
      Toast({
        title: 'Error',
        // description: errorData.message || `Error ${response.status}`,
        variant: 'destructive',
      });
    }

    // Create error with response details
    const error = new Error(errorData.message || 'API request failed') as Error & { status?: number; data?: { message?: string } };
    error.status = response.status;
    error.data = errorData;
    throw error;
  } catch (err) {
    // Handle network errors
    if (!(err instanceof Error) || !((err as { status?: number }).status)) {
      if (showErrorToast) {
        Toast({
          title: 'Network Error',
        //   description: 'Failed to connect to the server. Please check your connection.',
          variant: 'destructive',
        });
      }
    }
    throw err;
  }
}

// Convenience methods
export const api = {
  get: <T = unknown>(url: string, options?: FetchOptions) => 
    fetchClient<T>(url, { method: 'GET', ...options }),
  
  post: <T = unknown, U = unknown>(url: string, data?: U, options?: FetchOptions) => 
    fetchClient<T>(url, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  put: <T = unknown, U = unknown>(url: string, data?: U, options?: FetchOptions) => 
    fetchClient<T>(url, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  patch: <T = unknown, U = unknown>(url: string, data?: U, options?: FetchOptions) => 
    fetchClient<T>(url, { 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  delete: <T = unknown>(url: string, options?: FetchOptions) => 
    fetchClient<T>(url, { method: 'DELETE', ...options }),
  
  upload: <T = unknown>(url: string, formData: FormData, options?: FetchOptions) => 
    fetchClient<T>(url, { 
      method: 'POST', 
      body: formData,
      ...options 
    }),
};