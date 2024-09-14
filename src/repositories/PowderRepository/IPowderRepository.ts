import { IPowder } from "@/models/IPowder";
import { Observable } from "rxjs";

export interface IPowderRepository {
  getPowders(): Observable<IPowder[]>;
  getBlankPowder(): IPowder;
}
