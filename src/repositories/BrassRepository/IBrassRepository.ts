import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";
import { Observable } from "rxjs";

export interface IBrassRepository {
  getBrasses(): Observable<IBrass[]>;
  getBlankBrass(chambering: IChambering): IBrass;
}
