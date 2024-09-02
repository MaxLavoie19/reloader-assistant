import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IManufacturer } from "@/models/IManufacturer";

export interface IManufacturerAutocompleteMapper extends IAutocompleteMapper<IManufacturer> {
  map(option: IManufacturer): IAutocompleteItem<IManufacturer>;
}
