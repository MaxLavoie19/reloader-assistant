import { IPowder } from "@/models/IPowder";

export interface IPowderRepository {
  getPowders(): Promise<IPowder[]>;
  getBlankPowder(): IPowder;
}
