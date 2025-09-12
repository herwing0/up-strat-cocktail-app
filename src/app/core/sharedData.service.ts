import { Injectable, signal, WritableSignal } from '@angular/core';
import { Cocktail } from '../shared/models/cocktail.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  tableData: WritableSignal<any> = signal<any>([]);
  cocktailDetail: WritableSignal<any> = signal<any>({});
  cockTailIngredients: WritableSignal<any> = signal<any>({});
  amountstrAlcoholic: WritableSignal<any> = signal<any>(undefined);

  updateTable(cocktails: any): void {
    this.tableData.set(cocktails);
    this.countAmountsAlcohol(cocktails);
  }

  cocktailDetails(cocktail: any): void {
    this.cocktailDetail.set(cocktail);
    this.cockTailIngredients.set(this.parseIngredients(cocktail));
  }

  countAmountsAlcohol(cocktails: Cocktail[]) {
    if(cocktails.length > 0){
    const counts = cocktails.reduce(
      (acc, cocktail) => {
        if (cocktail.strAlcoholic === 'Alcoholic') {
          acc.alcoholic++;
        } else if (cocktail.strAlcoholic === 'Non alcoholic') {
          acc.nonAlcoholic++;
        }
        return acc;
      },
      { alcoholic: 0, nonAlcoholic: 0 }
    );
    this.amountstrAlcoholic.set(counts);
    }
  }

  parseIngredients(drink: Cocktail) {
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ing) {
        ingredients.push(`${measure ? measure : ''} ${ing}`.trim());
      }
    }
    return ingredients;
  }
}
