import { creedmoor6_5Brass, winchester308Brass } from "@/data/brass";
import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";
import { IBrassRepository as IBrassRepository } from "@/repositories/BrassRepository/IBrassRepository";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class BrassRepository implements IBrassRepository {
  public getBrasses(): Observable<IBrass[]> {
    return new Observable((observer) => observer.next([creedmoor6_5Brass, winchester308Brass]));
  }
  public getBlankBrass(chambering: IChambering): IBrass {
    return {
      id: uuid.v4(),
      chambering: chambering,
      manufacturer: {
        name: ''
      },
    };
  }
}
