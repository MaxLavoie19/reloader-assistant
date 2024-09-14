import { caliber6_5mm, caliber7_62 } from "@/data/caliber";
import { ICaliber } from "@/models/ICaliber";
import { ICaliberRepository } from "@/repositories/CaliberRepository/ICaliberRepository";
import { Observable } from "rxjs";

export class CaliberRepository implements ICaliberRepository {
  public getCalibers(): Observable<ICaliber[]> {
    return new Observable((observer) => observer.next([caliber6_5mm, caliber7_62]));
  }

  public getEmptyCaliber(): ICaliber {
    return { name: '' }
  }
}
