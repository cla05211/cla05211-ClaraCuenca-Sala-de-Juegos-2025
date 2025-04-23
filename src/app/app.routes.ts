import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

export const routes: Routes = 
[
    {path: "login", component:LoginComponent},
    {path: "registro", component:RegistroComponent},
    {path: "home", component:HomeComponent},
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "quienSoy", component:QuienSoyComponent},
];
