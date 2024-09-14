import { creedmoor6_5Chambering, winchester308Chambering } from "@/data/chambering";
import { IChambering } from "@/models/IChambering";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";
import { IChamberingRepository } from "@/repositories/ChamberRepository/IChamberingRepository";
import { Observable } from "rxjs";
import { uuid } from "vue-uuid";

export class ChamberingRepository implements IChamberingRepository {
  constructor(private caliberRepository: ICaliberRepository) { }

  public getChamberings(): Observable<IChambering[]> {
    return new Observable((observer) => observer.next([creedmoor6_5Chambering, winchester308Chambering]));
  }

  public getEmptyChambering(): IChambering {
    return {
      id: uuid.v4(),
      name: '',
      caliber: this.caliberRepository.getEmptyCaliber(),
    };
  }
}
