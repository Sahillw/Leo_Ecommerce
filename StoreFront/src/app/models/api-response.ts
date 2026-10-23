export interface ApiResponse<T> {
  status: number;
  message?: string;
  msg?: string;
  data: T;
}
