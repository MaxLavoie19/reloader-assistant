import { IBrassAutocompleteMapper } from "@/mappers/IBrassAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IBrass } from "@/models/IBrass";
import { IChambering } from "@/models/IChambering";

export class BrassAutocompleteMapper implements IBrassAutocompleteMapper {
  public map(option: IBrass): IAutocompleteItem<IBrass> {
    return {
      title: `${option.manufacturer.name} ${option.chambering.name}`,
      value: option,
    };
  }
}
