import { uuid } from "vue-uuid";

import { IPowder } from "@/models/IPowder";
import { powder } from "@/data/powder";
import { Observable } from "rxjs";
import { IPowderRepository } from "@/repositories/PowderRepository/IPowderRepository";
import { IApiService } from "@/services/ApiService/IApiService";

export class PowderRepository implements IPowderRepository {
  constructor(private apiService: IApiService) { }

  public getPowders(): Observable<IPowder[]> {
    const powders = this.apiService.getList<IPowder>("powders");
    return powders;
  }

  public getBlankPowder(): IPowder {
    return {
      id: uuid.v4(),
      name: '',
      manufacturer: {name: ''},
    }
  }
}
