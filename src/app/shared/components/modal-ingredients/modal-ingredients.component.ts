import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from '../../../core/dialog.service';
import { SharedDataService } from '../../../core/sharedData.service';

@Component({
  selector: 'app-modal-ingredients',
  standalone : true,
  templateUrl: './modal-ingredients.component.html',
  styleUrls: ['./modal-ingredients.component.scss'],
  imports: [CommonModule, ButtonModule, DialogModule ],
})
export class ModalIngredientsComponent {
   private dialogService = inject(DialogService);
   sharedDataService = inject(SharedDataService);
   visible = false;

    ingredientes = computed(() => {
    return this.sharedDataService.cockTailIngredients();
  });

    cocktail = computed(() => {
    return this.sharedDataService.cocktailDetail();
  });

  constructor() {
    effect(() => {
      const shouldBeVisible = this.dialogService.isDialogVisible();
      if (this.visible !== shouldBeVisible) {
        this.visible = shouldBeVisible;
      }
    });
  }

  onDialogHide() {
    this.dialogService.closeDialog();
  }
  onHide() {
    this.dialogService.closeDialog();
  }
}
