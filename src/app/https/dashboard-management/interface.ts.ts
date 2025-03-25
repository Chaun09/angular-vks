export interface IDashBoardRes<T> {
  status: boolean;
  message: string;
  content: Map<string, T>;
}
