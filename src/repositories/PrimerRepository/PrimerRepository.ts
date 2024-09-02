import { largePrimer } from "@/data/primer";
import { IPrimer } from "@/models/IPrimer";
import { IPrimerRepository } from "@/repositories/IPrimerRepository";
import { uuid } from 'vue-uuid';

export class PrimerRepository implements IPrimerRepository {
  public getPrimers(): Promise<IPrimer[]> {
    return Promise.resolve([largePrimer]);
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
