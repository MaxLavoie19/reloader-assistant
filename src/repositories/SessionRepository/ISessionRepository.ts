import { Observable } from "rxjs";

export interface ISessionRepository {
  isLoggedIn(): Observable<boolean>;
  logout(): void;
  setToken(authToken: string): void
  getToken(): Observable<string | undefined>
}
