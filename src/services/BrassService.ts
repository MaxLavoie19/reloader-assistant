import { creedmoor6_5Brass, winchester308Brass } from "@/data/brass";
import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";
import { IBrassService } from "@/services/IBrassService";
import { uuid } from 'vue-uuid';

export class BrassService implements IBrassService {
  public async getBrasses(): Promise<IBrass[]> {
    return Promise.resolve([creedmoor6_5Brass, winchester308Brass]);
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
