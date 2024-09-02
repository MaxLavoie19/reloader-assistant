import { IChamberingAutocompleteMapper } from "@/mappers/IChamberingAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IChambering } from "@/models/IChambering";

export class ChamberingAutocompleteMapper implements IChamberingAutocompleteMapper {
  public map(option: IChambering): IAutocompleteItem<IChambering> {
    return {
      title: option.name,
      value: option,
    };
  }
}
