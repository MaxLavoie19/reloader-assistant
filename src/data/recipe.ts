import { creedmoor6_5Brass } from "@/data/brass";
import { bullet6_5 } from "@/data/bullet";
import { powder } from "@/data/powder";
import { largePrimer } from "@/data/primer";
import { IRecipe } from "@/models/IRecipe";

export const recipeA: IRecipe = {
  id: "a0ee1885-9d81-42ba-aa2d-6adbb45a0c13",
  name: "first",
  brass: creedmoor6_5Brass,
  bullet: bullet6_5,
  primer: largePrimer,
  powder: powder,
  minPowderQuantityGrains: 37,
  maxPowderQuantityGrains: 40,
  notes: "",
}

export const recipeB: IRecipe = {
  id: "0bd6bd7d-ce7b-49cc-8a1e-eb4df9559861",
  name: "second",
  brass: creedmoor6_5Brass,
  bullet: bullet6_5,
  primer: largePrimer,
  powder: powder,
  minPowderQuantityGrains: 37,
  maxPowderQuantityGrains: 40,
  bulletSeatingDepth: 5,
  cartridgeBaseToOgiveLengthMm: 123,
  cartridgeOveralLengthMm: 140,
  notes: "my notes 123",
}

export const blankRecipe: IRecipe = {
  id: "",
  name: "",
  brass: {
    id: "",
    chambering: {
      id: "",
      caliber: {
        name: "",
      },
      name: "",
    },
    manufacturer: {
      name: "",
    }
  },
  bullet: {
    id: "",
    caliber: {
      name: "",
    },
    manufacturer: {
      name: "",
    },
    model: "",
    weightInGrains: 0,
    g1BallisticCoefficient: 0.0,
    g7BallisticCoefficient: 0.0,
    sectionalDensity: 0.0,
  },
  primer: {
    id: "",
    name: "",
    size: "",
    manufacturer: {
      name: "",
    },
  },
  powder: {
    id: "",
    name: "",
    manufacturer: {
      name: ""
    }
  },
  minPowderQuantityGrains: 0,
  maxPowderQuantityGrains: 0,
  bulletSeatingDepth: 0.0,
  cartridgeOveralLengthMm: 0.0,
  cartridgeBaseToOgiveLengthMm: 0.0,
  notes: "",
};
