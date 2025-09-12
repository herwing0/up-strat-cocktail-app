import { Routes } from '@angular/router';
import { RootComponent } from './shared/components/root/root.component';
import { DetailCocktelComponent } from './shared/components/detail-cocktel/detail-cocktel.component';

export const routes: Routes = [
  { path: '', component: RootComponent },
 { path: 'cocktail/:id', component: DetailCocktelComponent },
  { path: '**', redirectTo: '' }
];
