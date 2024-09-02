import { uuid } from "vue-uuid";

import { IPowder } from "@/models/IPowder";
import { IPowderRepository } from "@/repositories/IPowderRepository";
import { powder } from "@/data/powder";

export class PowderRepository implements IPowderRepository {
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
