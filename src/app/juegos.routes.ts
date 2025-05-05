import { Routes } from "@angular/router";

export const routes: Routes = 
[
    {path: "ahorcado", loadComponent: ()=> import ("./pages/ahorcado/ahorcado.component") .then ((archivo) => archivo.AhorcadoComponent)},
    {path: "mayoromenor", loadComponent: ()=> import ("./pages/mayor-o-menor/mayor-o-menor.component") .then ((archivo) => archivo.MayorOMenorComponent)},
]