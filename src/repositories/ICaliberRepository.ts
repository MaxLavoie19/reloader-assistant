import { ICaliber } from "@/models/ICaliber";

export interface ICaliberRepository {
  getCalibers(): Promise<ICaliber[]>
  getEmptyCaliber(): ICaliber
}
