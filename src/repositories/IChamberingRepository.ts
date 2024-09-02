import { IChambering } from "@/models/IChambering";

export interface IChamberingRepository {
  getChamberings(): Promise<IChambering[]>
  getEmptyChambering(): IChambering
}
