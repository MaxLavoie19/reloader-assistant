export interface ISessionRepository {
  login(username: string, credential: string): void;
  isLoggedIn(): boolean;
  logout(): void;
}
