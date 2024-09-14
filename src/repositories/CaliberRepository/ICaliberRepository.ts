import { ICaliber } from "@/models/ICaliber";
import { Observable } from "rxjs";

export interface ICaliberRepository {
  getCalibers(): Observable<ICaliber[]>
  getEmptyCaliber(): ICaliber
}
