import { IManufacturerAutocompleteMapper } from "@/mappers/IManufacturerAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IManufacturer } from "@/models/IManufacturer";

export class ManufacturerAutocompleteMapper implements IManufacturerAutocompleteMapper {
  public map(option: IManufacturer): IAutocompleteItem<IManufacturer> {
    return {
      title: option.name,
      value: option,
    };
  }
}
