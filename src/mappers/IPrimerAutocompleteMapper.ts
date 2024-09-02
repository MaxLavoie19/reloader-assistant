import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IPrimer } from "@/models/IPrimer";

export interface IPrimerAutocompleteMapper extends IAutocompleteMapper<IPrimer> {
  map(option: IPrimer): IAutocompleteItem<IPrimer>;
}
