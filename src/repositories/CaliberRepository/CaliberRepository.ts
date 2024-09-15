import { caliber6_5mm, caliber7_62 } from "@/data/caliber";
import { ICaliber } from "@/models/ICaliber";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable } from "rxjs";

export class CaliberRepository implements ICaliberRepository {
  constructor(private apiService: IApiService) { }

  public getCalibers(): Observable<ICaliber[]> {
    const calibers = this.apiService.getList<ICaliber>("calibers");
    return calibers;
  }

  public getEmptyCaliber(): ICaliber {
    return { name: '' }
  }
}
