import { IPrimer } from "@/models/IPrimer";

export interface IPrimerRepository {
  getPrimers(): Promise<IPrimer[]>;
  getBlankPrimer(): IPrimer;
}
