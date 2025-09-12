
export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strIngredient?: Record<number, string>;
  strDrinkThumb?: string;
  strCategory?: string;
  strAlcoholic?: string;
  dateModified?: string | null;
  strInstructions?: string;
  strVideo?: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
