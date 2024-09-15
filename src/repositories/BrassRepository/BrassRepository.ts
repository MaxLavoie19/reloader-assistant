import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";
import { IBrassRepository as IBrassRepository } from "@/repositories/BrassRepository/IBrassRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class BrassRepository implements IBrassRepository {
  constructor(private apiService: IApiService) { }

  public getBrasses(): Observable<IBrass[]> {
    const brasses = this.apiService.getList<IBrass>("brasses");
    return brasses;
  }
  public getBlankBrass(chambering: IChambering): IBrass {
    return {
      id: uuid.v4(),
      chambering: chambering,
      manufacturer: {
        name: ''
      },
    };
  }
}
