import { Observable } from "rxjs";

export interface IApiService {
  login(username: string, password: string): Observable<boolean>;
  logout(): void;
  getById<T>(targetType: string, id: string): Observable<T>
  getList<T>(targetType: string): Observable<T[]>
  post<T>(data: T): void;
}
