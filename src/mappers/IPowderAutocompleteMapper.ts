import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IPowder } from "@/models/IPowder";

export interface IPowderAutocompleteMapper extends IAutocompleteMapper<IPowder> {
  map(option: IPowder): IAutocompleteItem<IPowder>;
}
