import { Observable } from "rxjs";

export interface IApiService {
  login(username: string, password: string): Observable<boolean>;
  logout(): void;
  getList<T>(destination: string): Observable<T[]>
  post<T, U=T>(destination: string, data: T): Observable<U>;
}
