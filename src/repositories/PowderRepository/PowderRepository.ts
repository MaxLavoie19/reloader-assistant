import { uuid } from "vue-uuid";

import { IPowder } from "@/models/IPowder";
import { powder } from "@/data/powder";
import { Observable } from "rxjs";
import { IPowderRepository } from "@/repositories/PowderRepository/IPowderRepository";

export class PowderRepository implements IPowderRepository {
  public getPowders(): Observable<IPowder[]> {
    return new Observable((observer) => observer.next([powder]));
  }

  public getBlankPowder(): IPowder {
    return {
      id: uuid.v4(),
      name: '',
      manufacturer: {name: ''},
    }
  }
}
