import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IChambering } from "@/models/IChambering";

export interface IChamberingAutocompleteMapper extends IAutocompleteMapper<IChambering> {
  map(option: IChambering): IAutocompleteItem<IChambering>;
}
