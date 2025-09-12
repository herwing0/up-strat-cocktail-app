import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SharedDataService } from '../../../core/sharedData.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CocktailService } from '../../../core/api/cocktail.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-detail-cocktel',
  templateUrl: './detail-cocktel.component.html',
  styleUrls: ['./detail-cocktel.component.scss'],
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule],
})
export class DetailCocktelComponent implements OnInit {
  sharedDataService = inject(SharedDataService);
  loading = false;
  selectedLanguage = signal<'EN' | 'ES' | 'FR' | 'IT' | 'DE'>('EN');
  cocktail = computed(() => {
    return this.sharedDataService.cocktailDetail();
  });

  ingredientes = computed(() => {
    return this.sharedDataService.cockTailIngredients();
  });

  instructions = computed(() => {
    const lang = this.selectedLanguage();
    const cocktail = this.cocktail();
    switch (lang) {
      case 'ES':
        return cocktail.strInstructionsES;
      case 'FR':
        return cocktail.strInstructionsFR;
      case 'IT':
        return cocktail.strInstructionsIT;
      case 'DE':
        return cocktail.strInstructionsDE;
      case 'EN':
      default:
        return cocktail.strInstructions;
    }
  });

  constructor(
    private router: Router,
    public cocktailService: CocktailService
  ) {}

  ngOnInit() {
  }

  getIngredients(drink: any): string[] {
    const ingredients = this.sharedDataService.parseIngredients(drink);
    return ingredients;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goRandom() {
    this.loading = true;
    this.cocktailService.randomCocktail().subscribe(
      (cocktail) => {
        this.sharedDataService.cocktailDetails(cocktail);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching cocktail:', error);
        this.loading = false;
      }
    );
  }

  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedLanguage.set(target.value as 'EN' | 'ES' | 'FR' | 'IT' | 'DE');
  }
}
