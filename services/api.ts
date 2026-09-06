const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      `API request gagal: ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}