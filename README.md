# 🍸 Cocktail Explorer

Aplicación desarrollada en **Angular 20** que permite explorar y buscar cócteles consumiendo la API pública de [TheCocktailDB](https://www.thecocktaildb.com/).  
El proyecto combina un diseño moderno con **PrimeNG** y aprovecha **Angular Signals** para la gestión de datos reactivos.  

---

##  Desafios Principales
 - En este projecto en particular, me anime a utilizar Prime Ng con Angular 20 por primera vez tuve un problema al configurar main.ts, cuya solucion fue instalar librerias deprecedas de animaciones, para cargar algunas animaciones de PrimeNg, como los spinners.
 A si mismo, intente crear un archivo global para manejar las clases pricipales de PrimeNg [prime-ng-style.scss](./src/app/scss/prime-ng-style.scss), pero no tuve tiempo suficiente para indentificar todas las clases, por los que recurri a utilizar algunos ::ng-deep para mitigar.
---

## Dependencias principales

Este proyecto está construido sobre **Angular 20** con **PrimeNG** como librería UI.

```json
{
  "@angular/animations": "^20.3.0",
  "@angular/common": "^20.1.0",
  "primeng": "^20.1.1",
  "@primeuix/themes": "^1.2.3",
}
```
## Root

+---core
|   \---api
+---scss
\---shared
    +---components
    |   +---cocktail-table
    |   +---detail-cocktel
    |   +---modal-ingredients
    |   +---root
    |   \---silder-images
    \---models
---

## How to Install

npm install
ng serve

---

## Resumen técnico
El proyecto implementa una arquitectura modular, donde los componentes principales se comunican a través de **Signals**.  
Se diseñaron estilos globales en **SCSS**, definiendo colores y temas reutilizables, que se aplican sobre los componentes de **PrimeNG** para lograr una interfaz más personalizada y moderna.