import { largePrimer } from "@/data/primer";
import { IPrimer } from "@/models/IPrimer";
import { IPrimerService } from "@/services/IPrimerService";
import { uuid } from 'vue-uuid';

export class PrimerService implements IPrimerService {
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
