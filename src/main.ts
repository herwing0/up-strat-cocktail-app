import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import Nora from '@primeuix/themes/nora';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { providePrimeNG } from 'primeng/config';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    BrowserAnimationsModule,
    importProvidersFrom(BrowserAnimationsModule), // deprecado pero necesario para prime ng
    providePrimeNG({ theme: { preset: Nora } })
  ]
}).catch(err => console.error(err));
