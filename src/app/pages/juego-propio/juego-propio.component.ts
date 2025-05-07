import { Component } from '@angular/core';

@Component({
  selector: 'app-juego-propio',
  imports: [],
  templateUrl: './juego-propio.component.html',
  styleUrl: './juego-propio.component.css'
})
export class JuegoPropioComponent 
{
    tiempoPartida: number = 0;
    vidaEnemigo: number = 0;
    palabrasPosibles: Array<string> = [];
    palabrasEnPantalla: Array<string> = [];
    palabaIngresada: Array<string> = [];
}
