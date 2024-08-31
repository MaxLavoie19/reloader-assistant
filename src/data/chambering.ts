import { caliber6_5mm, caliber7_62 } from "@/data/caliber";
import { IChambering } from "@/models/IChambering";

export const creedmoor6_5Chambering: IChambering = {
  id: "6.5 creedmoor ID",
  caliber: caliber6_5mm,
  name: "6.5 creedmoor"
}

export const winchester308Chambering: IChambering = {
  id: "308 winchester ID",
  caliber: caliber7_62,
  name: "308 Winchester"
}
