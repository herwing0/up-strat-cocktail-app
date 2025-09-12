import { Component, computed, inject, OnInit } from '@angular/core';
import { SharedDataService } from '../../../core/sharedData.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-cocktel',
  templateUrl: './detail-cocktel.component.html',
  styleUrls: ['./detail-cocktel.component.scss'],
  imports: [CommonModule, ButtonModule],
})
export class DetailCocktelComponent implements OnInit {
  sharedDataService = inject(SharedDataService);

  cocktail = computed(() => {
    return this.sharedDataService.cocktailDetail();
  });

  ingredientes = computed(() => {
    return this.sharedDataService.cockTailIngredients();
  });

  constructor(private router: Router) {}

  ngOnInit() {}

  getIngredients(drink: any): string[] {
    const ingredients = this.sharedDataService.parseIngredients(drink);
    return ingredients;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
