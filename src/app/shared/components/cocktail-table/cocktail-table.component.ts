import {
  Component,
  computed,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedDataService } from '../../../core/sharedData.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { Popover, PopoverModule } from 'primeng/popover';
import { Router } from '@angular/router';
import { Cocktail } from '../../models/cocktail.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService } from '../../../core/dialog.service';
import { ModalIngredientsComponent } from '../modal-ingredients/modal-ingredients.component';
import { SilderImagesComponent } from '../silder-images/silder-images.component';

@Component({
  selector: 'app-cocktail-table',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    PopoverModule,
    ProgressSpinnerModule,
    ModalIngredientsComponent,
    SilderImagesComponent
  ],
  templateUrl: './cocktail-table.component.html',
  styleUrls: ['./cocktail-table.component.scss'],
})
export class CocktailTableComponent implements OnInit {
  sharedDataService = inject(SharedDataService);
    private dialogService = inject(DialogService);

  @ViewChild('op') op!: Popover;
  selectedProduct: Cocktail | undefined;
  newData = computed(() => {
    return this.sharedDataService.tableData();
  });

  ingredientes = computed(() => {
    return this.sharedDataService.cockTailIngredients();
  });

  amountstrAlcoholic = computed(() => {
    return this.sharedDataService.amountstrAlcoholic();
  });


  constructor(private router: Router) {}

  ngOnInit() {
  }

  getSeverity(product: Cocktail) {
    switch (product.strAlcoholic) {
      case 'Alcoholic':
        return 'ALCOHOL';
      case 'Non alcoholic':
        return 'SIN ALCOHOL';
      default:
        return null;
    }
  }

  displayProduct(event: any, cocktailSelected: Cocktail) {
    if (this.selectedProduct?.idDrink === cocktailSelected.idDrink) {
      this.op.hide();
      this.selectedProduct = undefined;
    } else {
      this.selectedProduct = cocktailSelected;
      this.op.show(event);

      if (this.op.container) {
        this.op.align();
      }
    }
  }

  hidePopover() {
    this.op.hide();
  }

  countIngredients(drink: any): number {
    let count = 0;
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        count++;
      }
    }
    return count;
  }

  goCocktail(cocktail: Cocktail) {
    this.sharedDataService.cocktailDetails(cocktail);
    this.router.navigate(['/cocktail', cocktail.idDrink]);
  }

  goToYoutube(videoUrl?: string): void {
    if (!videoUrl) {
      this.op.hide();
    } else {
      window.open(videoUrl, '_blank');
    }
  }

  openDialog(cocktail : Cocktail) {
    this.sharedDataService.cocktailDetails(cocktail);
    this.dialogService.openDialog();
  }

  openDialogImage() {
    this.dialogService.openDialogImage();
  }
}
