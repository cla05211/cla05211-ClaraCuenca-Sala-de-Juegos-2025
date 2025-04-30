import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './pages/mayor-o-menor/mayor-o-menor.component';
import { SalaChatComponent } from './pages/sala-chat/sala-chat.component';

export const routes: Routes = 
[
    {path: "login", component:LoginComponent},
    {path: "registro", component:RegistroComponent},
    {path: "home", component:HomeComponent},
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "quienSoy", component:QuienSoyComponent},
    {path: "ahorcado", component:AhorcadoComponent},
    {path: "mayoromenor", component:MayorOMenorComponent},
    {path: "salaChat", component:SalaChatComponent},
];
