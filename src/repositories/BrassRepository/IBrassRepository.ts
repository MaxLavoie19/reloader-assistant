import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";

export interface IBrassRepository {
  getBrasses(): Promise<IBrass[]>;
  getBlankBrass(chambering: IChambering): IBrass;
}
