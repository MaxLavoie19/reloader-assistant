import { NotAuthenticatedError } from "@/errors/NotAuthenticatedError";
import { ISessionRepository } from "@/repositories/SessionRepository/ISessionRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { map, Observable, take } from "rxjs";

export class ApiService implements IApiService {
  constructor(private sessionRepository: ISessionRepository) { }

  login(username: string, password: string): Observable<boolean> {
    const authToken = '1234abcd';
    this.sessionRepository.setToken(authToken);
    return new Observable((observer) => observer.next(username == "asd" && password == "dsa"));
  }

  logout(): void {
    this.sessionRepository.logout();
  }

  getById<T>(targetType: string, id: string): Observable<T> {
    return this.sessionRepository.isLoggedIn().pipe(take(1), map((isLoggedIn) => {
      if (!isLoggedIn) throw new NotAuthenticatedError();
      return {} as T;
    }));
  }

  getList<T>(targetType: string): Observable<T[]> {
    return this.sessionRepository.isLoggedIn().pipe(take(1), map((isLoggedIn) => {
      if (!isLoggedIn) throw new NotAuthenticatedError();
      return [] as T[];
    }));
  }

  post<T>(data: T): void {
    this.sessionRepository.isLoggedIn().pipe(take(1), map((isLoggedIn) => {
      if (!isLoggedIn) throw new NotAuthenticatedError();
    })).subscribe();
  }
}
