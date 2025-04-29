import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent 
{
    partidaIniciada: boolean = false;
    palabraJuego:string = "";
    posiblesPalabras = ['CORRER', 'CAMINO', 'GUITARRA', 'VENTANA', 'RATON', 'FIESTA', 'BOSQUE', 'ARENA', 'AVION', 'CARRO', 'NADAR', 'PIEDRA', 'AMIGOS', 'REIR', 'BAILAR', 'BARCO', 'JUGAR', 'SALTAR', 'LUZ', 'VERDE']
    letrasErradas:Array<string>=[];
    abecedario: Array<string> = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    letrasIngresadas: Array<string> = [];
    partidaFinalizada:boolean = false;
    victoria:boolean = false;
    imagen:string = "/juegos/ahorcado/0.png";
    

    iniciarPartida():void
    {
        this.palabraJuego = this.posiblesPalabras[Math.floor(Math.random() * this.posiblesPalabras.length)];
        this.letrasIngresadas.length = 0;
        for (const letra of this.palabraJuego)
        {
            this.letrasIngresadas.push("_");
        }
        this.partidaFinalizada = false;
        this.victoria = false;
        this.letrasErradas.length = 0;
        this.determinarImagen();
    }

    determinarLetraCorrecta(letraIngresada:string)
    {
        var acerto: boolean = false;

        for (const [index, letraCorrecta] of Array.from(this.palabraJuego).entries()) 
        {
            console.log(index);
            console.log("Letra que hay que llenar: " + letraCorrecta)
            console.log("letra ingresada: "+ letraIngresada);
            if (letraIngresada == letraCorrecta)
            {
                this.ingresarLetra(letraIngresada, index);
                console.log(this.letrasIngresadas);
                acerto = true;
            }
        }
        if (!acerto)
        {
            this.ahorcar(letraIngresada);
        }
    }

    ingresarLetra(letraIngresada:string, posicionLetra: number)
    {
        this.letrasIngresadas[posicionLetra] = letraIngresada;
        console.log(this.letrasIngresadas.length)
        console.log(this.palabraJuego.length)
        if((this.letrasIngresadas.filter(letra => letra != '_')).length == this.palabraJuego.length)
        {
            this.partidaFinalizada = true;
            this.victoria = true;
        }
    }

    ahorcar(letraIngresada:string)
    {
        this.letrasErradas.push(letraIngresada);
        this.determinarImagen();

        if(this.letrasErradas.length > 6)
        {
            this.partidaFinalizada = true;
        }
    }

    determinarImagen()
    {
        var rutaBase:string = "/juegos/ahorcado/"
        this.imagen = rutaBase + (this.letrasErradas.length).toString() + ".png";    
    }


}
