import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SharedDataService } from '../../../core/sharedData.service';
import { Cocktail } from '../../models/cocktail.model';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from '../../../core/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-silder-images',
  imports: [CommonModule, ButtonModule, GalleriaModule, DialogModule  ],
  templateUrl: './silder-images.component.html',
  styleUrls: ['./silder-images.component.scss']
})
export class SilderImagesComponent implements OnInit {
private dialogService = inject(DialogService);
visible = false;
sharedDataService = inject(SharedDataService);
cocktails = computed(() => {
    return this.sharedDataService.tableData();
  });

  images = computed(() =>
    this.cocktails().map((cocktail : Cocktail) => ({
      cocktail: cocktail,
      itemImageSrc: cocktail.strDrinkThumb,
      thumbnailImageSrc: cocktail.strDrinkThumb,
      alt: cocktail.strDrink,
      title: cocktail.strDrink
    }))
  );
  
   constructor(private router: Router) {
    effect(() => {
      const shouldBeVisible = this.dialogService.isDialogVisibleImage();
      if (this.visible !== shouldBeVisible) {
        this.visible = shouldBeVisible;
      }
    });
  }

  ngOnInit() {
    }

  onDialogHide() {
    this.dialogService.closeDialogImage();
  }
  onHide() {
    this.dialogService.closeDialogImage();
  }

   goCocktail(cocktail: Cocktail) {
    this.sharedDataService.cocktailDetails(cocktail);
    this.router.navigate(['/cocktail', cocktail.idDrink]);
  }
    

}
