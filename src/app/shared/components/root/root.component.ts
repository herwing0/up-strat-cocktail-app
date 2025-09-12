import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CocktailService } from '../../../core/api/cocktail.service';
import { CocktailTableComponent } from "../cocktail-table/cocktail-table.component";
import { SharedDataService } from '../../../core/sharedData.service';
import { SelectModule } from 'primeng/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , TableModule, DialogModule, ButtonModule, CocktailTableComponent, SelectModule, ProgressSpinnerModule ],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent   {
 sharedDataService = inject(SharedDataService);
 tableData = signal<any[]>([]);

  filterTypeControl = new FormControl<'name' | 'firstLetter'>('name');
  filterValueControl = new FormControl('');
  loading = false;
  notFound : string = '/notfound.jpg'
  error : boolean = false
  constructor(public cocktailService: CocktailService, private router: Router) {
  }

    ngOnInit(): void {
    this.filterValueControl.valueChanges
      .pipe(
        switchMap(value => {
          const type = this.filterTypeControl.value;
          if (!value) return [ [] ];
          this.loading = true;
          this.error = false;
          return this.cocktailService.filterCocktails(type!, value);
        })
      )
      .subscribe({
        next: data => {
          if(data.drinks && data.drinks !== "no data found"){
          this.sharedDataService.updateTable(data.drinks);
          } else {
          this.sharedDataService.updateTable([]);
          this.error = true
          }
          this.loading = false;
        },
        error: () => {
          this.sharedDataService.updateTable([]);
          this.error = true
          this.loading = false;
        }
      });
  }

  goRandom(){
    this.cocktailService.randomCocktail().subscribe( cocktail => {
    this.sharedDataService.cocktailDetails(cocktail);
    this.router.navigate(['/cocktail', cocktail.idDrink]);
    })
  }

}
