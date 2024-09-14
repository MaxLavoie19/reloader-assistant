import { ISessionRepository } from "@/repositories/SessionRepository/ISessionRepository";
import { BehaviorSubject, map, Observable } from "rxjs";

const AUTH_TOKEN_KEY = "authToken"

export class SessionsRespository implements ISessionRepository {
  private authToken$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
      this.authToken$.next(localStorage.getItem(AUTH_TOKEN_KEY) || undefined);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(map(x => !!x));
  }

  logout(): void {
    this.authToken$.next(undefined);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  setToken(authToken: string): void {
    this.authToken$.next(authToken);
    localStorage.setItem(AUTH_TOKEN_KEY, authToken)
  }

  getToken(): Observable<string | undefined> {
    return this.authToken$.asObservable();
  }
}
