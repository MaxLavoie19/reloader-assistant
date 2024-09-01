import { uuid } from "vue-uuid";

import { IPowder } from "@/models/IPowder";
import { IPowderService } from "@/services/IPowderService";
import { powder } from "@/data/powder";

export class PowderService implements IPowderService {
  public async getPowders(): Promise<IPowder[]> {
    return Promise.resolve([powder]);
  }

  public getBlankPowder(): IPowder {
    return {
      id: uuid.v4(),
      name: '',
      manufacturer: {name: ''},
    }
  }
}
