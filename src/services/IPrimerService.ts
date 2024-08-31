import { IPrimer } from "@/models/IPrimer";

export interface IPrimerService {
  getPrimers(): Promise<IPrimer[]>;
  getBlankPrimer(): IPrimer;
}
