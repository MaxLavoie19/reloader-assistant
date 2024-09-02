import { IPrimerAutocompleteMapper } from "@/mappers/IPrimerAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IPrimer } from "@/models/IPrimer";

export class PrimerAutocompleteMapper implements IPrimerAutocompleteMapper {
  public map(option: IPrimer): IAutocompleteItem<IPrimer> {
    return {
      title: `${option.manufacturer.name} ${option.size} ${option.name}`,
      value: option
    };
  }
}
