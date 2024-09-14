import { largePrimer } from "@/data/primer";
import { IPrimer } from "@/models/IPrimer";
import { IPrimerRepository } from "@/repositories/PrimerRepository/IPrimerRepository";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class PrimerRepository implements IPrimerRepository {
  public getPrimers(): Observable<IPrimer[]> {
    return new Observable((observer) => observer.next([largePrimer]));
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
