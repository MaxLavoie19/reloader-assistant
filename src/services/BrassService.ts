import { creedmoor6_5Brass, winchester308Brass } from "@/data/brass";
import { IBrass } from "@/models/IBrass";

export class BrassService implements BrassService {
  public async getBrasses(): Promise<IBrass[]> {
    return Promise.resolve([creedmoor6_5Brass, winchester308Brass]);
  }

}
