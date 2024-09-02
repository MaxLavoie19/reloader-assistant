import { caliber6_5mm, caliber7_62 } from "@/data/caliber";
import { ICaliber } from "@/models/ICaliber";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";

export class CaliberRepository implements ICaliberRepository {
  public async getCalibers(): Promise<ICaliber[]> {
    return Promise.resolve([caliber6_5mm, caliber7_62]);
  }

  public getEmptyCaliber(): ICaliber {
    return { name: '' }
  }
}
