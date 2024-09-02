import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { ICaliber } from "@/models/ICaliber";

export interface ICaliberAutocompleteMapper extends IAutocompleteMapper<ICaliber> {
  map(option: ICaliber): IAutocompleteItem<ICaliber>;
}
