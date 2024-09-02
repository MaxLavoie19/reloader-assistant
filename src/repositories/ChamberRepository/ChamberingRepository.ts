import { creedmoor6_5Chambering, winchester308Chambering } from "@/data/chambering";
import { IChambering } from "@/models/IChambering";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";
import { IChamberingRepository } from "@/repositories/ChamberRepository/IChamberingRepository";
import { uuid } from "vue-uuid";

export class ChamberingRepository implements IChamberingRepository {
  constructor(private caliberRepository: ICaliberRepository) { }

  public async getChamberings(): Promise<IChambering[]> {
    return Promise.resolve([creedmoor6_5Chambering, winchester308Chambering]);
  }

  public getEmptyChambering(): IChambering {
    return {
      id: uuid.v4(),
      name: '',
      caliber: this.caliberRepository.getEmptyCaliber(),
    };
  }
}
