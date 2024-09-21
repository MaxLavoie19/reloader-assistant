import { NotAuthenticatedError } from "@/errors/NotAuthenticatedError";
import { ISessionRepository } from "@/repositories/SessionRepository/ISessionRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { map, Observable, switchMap, take } from "rxjs";

const POST = "POST";
const GET = "GET";
const HEADERS: {[key: string]: string} = {"Content-Type": "application/json"};

export class ApiService implements IApiService {
  constructor(private sessionRepository: ISessionRepository) { }

  login(username: string, password: string): Observable<boolean> {
    const requestOptions = {
      method: POST,
      headers: HEADERS,
      body: JSON.stringify({username, password})
    }

    return new Observable((observer) => {
      fetch("http://localhost:8765/login", requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((response) => {
        const authToken = response.token;
        this.sessionRepository.setToken(authToken);
        observer.next(true);
      });
    });
  }

  logout(): void {
    this.sessionRepository.logout();
  }

  getList<T>(destination: string): Observable<T[]> {
    const requestOptions = {
      method: GET,
      headers: {...HEADERS},
    }

    return this.sessionRepository.getToken().pipe(take(1), map((token) => {
      if (!token) throw new NotAuthenticatedError();
      requestOptions['headers']['Authorization'] = `Bearer ${token}`;
    }), switchMap(() => {
      return new Observable<T[]>((observer) => {
        fetch(`http://localhost:8765/${destination}`, requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((response) => {
          observer.next(response.items);
        });
      }).pipe(take(1));
    }),
  );
  }

  post<T, U=T>(destination: string, data: T): Observable<U> {
    const requestOptions = {
      method: POST,
      headers: HEADERS,
      body: JSON.stringify(data),
    }

    return this.sessionRepository.getToken().pipe(take(1), switchMap((token) => {
      if (!token) throw new NotAuthenticatedError();
      requestOptions['headers']['Authorization'] = `Bearer ${token}`;
      return new Observable<U>((observer) => {
        fetch(`http://localhost:8765/${destination}`, requestOptions)
          .then((response) => {
            if (response.status !== 200) {
              return Promise.reject();
            }
            return response.json();
          })
          .then((response) => {
            observer.next(response.data as U);
          });
      });
    }));
  }
}
