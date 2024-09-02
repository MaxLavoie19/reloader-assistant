import { ICaliberAutocompleteMapper } from "@/mappers/ICaliberAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { ICaliber } from "@/models/ICaliber";

export class CaliberAutocompleteMapper implements ICaliberAutocompleteMapper {
  public map(option: ICaliber): IAutocompleteItem<ICaliber> {
    return {
      title: option.name,
      value: option,
    };
  }
}
