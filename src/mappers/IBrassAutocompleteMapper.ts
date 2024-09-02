import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";

export interface IBrassAutocompleteMapper extends IAutocompleteMapper<IBrass> {
  map(option: IBrass): IAutocompleteItem<IBrass>;
}
