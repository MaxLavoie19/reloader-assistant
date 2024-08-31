import { creedmoor6_5Chambering, winchester308Chambering } from "@/data/chambering";
import { IChambering } from "@/models/IChambering";
import { IChamberingService } from "@/services/IChamberingService";

export class ChamberingService implements IChamberingService {
  public async getChamberings(): Promise<IChambering[]> {
    return Promise.resolve([creedmoor6_5Chambering, winchester308Chambering]);
  }

}
