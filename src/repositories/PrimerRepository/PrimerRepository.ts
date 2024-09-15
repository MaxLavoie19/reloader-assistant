import { IPrimer } from "@/models/IPrimer";
import { IPrimerRepository } from "@/repositories/PrimerRepository/IPrimerRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class PrimerRepository implements IPrimerRepository {
  constructor(private apiService: IApiService) { }

  public getPrimers(): Observable<IPrimer[]> {
    const primers = this.apiService.getList<IPrimer>("primers");
    return primers;
  }
  public getBlankPrimer(): IPrimer {
    return {
      id: uuid.v4(),
      name: '',
      size: '',
      manufacturer: {
        name: '',
      }
    };
  }
}
