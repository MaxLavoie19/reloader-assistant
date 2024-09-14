import { IPrimer } from "@/models/IPrimer";
import { Observable } from "rxjs";

export interface IPrimerRepository {
  getPrimers(): Observable<IPrimer[]>;
  getBlankPrimer(): IPrimer;
}
