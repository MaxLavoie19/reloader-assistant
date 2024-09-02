import { IAutocompleteItem } from "@/models/IAutocompleteItem";

export interface IAutocompleteMapper<T> {
  map(option: T): IAutocompleteItem<T>
}
