import { IChambering } from "@/models/IChambering";
import { Observable } from "rxjs";

export interface IChamberingRepository {
  getChamberings(): Observable<IChambering[]>
  getEmptyChambering(): IChambering
}
