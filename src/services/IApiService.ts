export interface IApiService {
  login(username: string, credential: string): Promise<string>;
}
