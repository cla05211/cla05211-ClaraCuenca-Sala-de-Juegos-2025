import { Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado.guard';

export const routes: Routes = 
[
    {path: "login", loadComponent: ()=> import ('./pages/login/login.component') .then ((archivo) => archivo.LoginComponent)},
    {path: "registro", loadComponent: ()=> import ('./pages/registro/registro.component') .then ((archivo) => archivo.RegistroComponent)},
    {path: "home", loadComponent: ()=> import ('./pages/home/home.component') .then ((archivo) => archivo.HomeComponent),},
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "juegos", loadChildren: ()=> import ('./juegos.routes') .then ((archivo) => archivo.routes), canActivate: [logueadoGuard]},
    {path: "quienSoy", loadComponent: ()=> import ('./pages/quien-soy/quien-soy.component') .then ((archivo) => archivo.QuienSoyComponent)},
    {path: "salaChat", loadComponent: ()=> import ('./pages/sala-chat/sala-chat.component') .then ((archivo) => archivo.SalaChatComponent), canActivate:[logueadoGuard]},
];
