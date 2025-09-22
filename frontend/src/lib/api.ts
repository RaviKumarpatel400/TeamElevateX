export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token')
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('admin_token', token)
}

export const clearAuthToken = () => {
  localStorage.removeItem('admin_token')
}

export const getUserToken = (): string | null => {
  return localStorage.getItem('user_token')
}

export const setUserToken = (token: string) => {
  localStorage.setItem('user_token', token)
}

export const clearUserToken = () => {
  localStorage.removeItem('user_token')
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const adminToken = getAuthToken()
  const userToken = getUserToken()
  const token = adminToken || userToken
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed with ${res.status}`)
  }
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return res.json()
  }
  // @ts-ignore
  return undefined
}


