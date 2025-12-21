export interface MiddlewareResult<T> {
  success: boolean;
  data?: T;
  error?: string | null;
}

export async function withMiddleware<T>(
  fn: () => Promise<T>,
): Promise<MiddlewareResult<T>> {
  try {
    const data = await fn();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Unexpected error",
    };
  }
}
