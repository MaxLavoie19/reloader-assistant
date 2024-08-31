import { IBrass } from "@/models/IBrass";

export interface IBrassService {
  getBrasses(): Promise<IBrass[]>
}
