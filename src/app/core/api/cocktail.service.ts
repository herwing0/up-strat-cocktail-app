import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cocktail } from '../../shared/models/cocktail.model';

const API = 'https://www.thecocktaildb.com/api/json/v1/1/';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  constructor(private http: HttpClient) {}

  randomCocktail(): Observable<Cocktail> {
    return this.http.get<{drinks:any[]}>(`${API}/random.php`)
      .pipe(map(res => (res.drinks && res.drinks.length ? res.drinks[0] : null)));
  }

    filterCocktails(type: 'name' | 'firstLetter', value: string): Observable<any> {
    let endpoint = '';

    switch (type) {
      case 'name':
        endpoint = `search.php?s=${value}`;
        break;
      case 'firstLetter':
        endpoint = `search.php?f=${value}`;
        break;
    }

    return this.http.get<any>(`${API}${endpoint}`);
  }
}
