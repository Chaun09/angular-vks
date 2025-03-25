export interface IBaseResponse<T> {
  code: string | number | boolean;
  message: string;
  result: T;
}
