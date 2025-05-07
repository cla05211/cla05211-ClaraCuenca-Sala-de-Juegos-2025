import { Routes } from "@angular/router";

export const routes: Routes = 
[
    {path: "ahorcado", loadComponent: ()=> import ("./pages/ahorcado/ahorcado.component") .then ((archivo) => archivo.AhorcadoComponent)},
    {path: "mayoromenor", loadComponent: ()=> import ("./pages/mayor-o-menor/mayor-o-menor.component") .then ((archivo) => archivo.MayorOMenorComponent)},
    {path: "preguntados", loadComponent: ()=> import ("./pages/preguntados/preguntados.component") .then ((archivo) => archivo.PreguntadosComponent)},
    {path: "juegoPropio", loadComponent: ()=> import ("./pages/juego-propio/juego-propio.component") .then ((archivo) => archivo.JuegoPropioComponent)},
    {path: "resultados", loadComponent: ()=> import ("./pages/resultados/resultados.component") .then ((archivo) => archivo.ResultadosComponent)},
]