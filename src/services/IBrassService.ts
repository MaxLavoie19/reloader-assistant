import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";

export interface IBrassService {
  getBrasses(): Promise<IBrass[]>;
  getBlankBrass(chambering: IChambering): IBrass;
}
