import {  } from "@/data/chambering";
import { creedmoor6_5Chambering, winchester308Chambering } from "@/data/chambering";
import { hornady } from "@/data/manufacturer";
import { IBrass } from "@/models/IBrass";

export const creedmoor6_5Brass: IBrass = {
  id: "creedmoor6_5Brass ID",
  chambering: creedmoor6_5Chambering,
  manufacturer: hornady,
}

export const winchester308Brass: IBrass = {
  id: "winchester308Brass ID",
  chambering: winchester308Chambering,
  manufacturer: hornady,
}
