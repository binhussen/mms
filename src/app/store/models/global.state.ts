export interface GlobalState{
  loading: boolean;
  error: { message: string; statusCode: string; } | null;
  message: { message: string; duration: number; } | null;
}
