import axios from 'axios'
import { env } from '@/lib/env'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ApiError {
  message: string
  errors: Record<string, string[]>
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as Partial<ApiError>
    return {
      message: data.message ?? 'An unexpected error occurred.',
      errors: data.errors ?? {},
    }
  }
  return {
    message: 'An unexpected error occurred.',
    errors: {},
  }
}
