import { IChambering } from "@/models/IChambering";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";
import { IChamberingRepository } from "@/repositories/ChamberRepository/IChamberingRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable, tap } from "rxjs";
import { uuid } from "vue-uuid";

export class ChamberingRepository implements IChamberingRepository {
  constructor(private caliberRepository: ICaliberRepository, private apiService: IApiService) { }

  public getChamberings(): Observable<IChambering[]> {
    const chamberings = this.apiService.getList<IChambering>("chamberings");
    return chamberings;
  }

  public getEmptyChambering(): IChambering {
    return {
      id: uuid.v4(),
      name: '',
      caliber: this.caliberRepository.getEmptyCaliber(),
    };
  }
}
