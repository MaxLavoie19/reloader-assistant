import { IPowder } from "@/models/IPowder";

export interface IPowderService {
  getPowders(): Promise<IPowder[]>;
  getBlankPowder(): IPowder;
}
