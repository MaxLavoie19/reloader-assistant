import { IChambering } from "@/models/IChambering";

export interface IChamberingService {
  getChamberings(): Promise<IChambering[]>
}
