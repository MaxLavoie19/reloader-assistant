import { IPowderAutocompleteMapper } from "@/mappers/IPowderAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IPowder } from "@/models/IPowder";

export class PowderAutocompleteMapper implements IPowderAutocompleteMapper {
  public map(option: IPowder): IAutocompleteItem<IPowder> {
    return {
      title: `${option.manufacturer.name} ${option.name}`,
      value: option
    };
  }
}
