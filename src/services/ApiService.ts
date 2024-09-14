import { IApiService } from "@/services/IApiService";

export class ApiService implements IApiService {
  login(username: string, credential: string): Promise<string> {
    const authToken = '1234abcd';
    return Promise.resolve(authToken);
  }

  logout(token: string) {

  }
}
