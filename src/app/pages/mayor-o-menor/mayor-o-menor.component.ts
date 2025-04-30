import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mayor-o-menor',
  imports: [CommonModule],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent 
{
    db = inject(DataBaseService);
    auth = inject(AuthService);
    numeroActual:number = 1;
    numeroAnterior:number = 1;
    imagen:string = "/juegos/cartas/pico/pico1.jpg";
    palos :Array<string> = ["pico","trebol","diamante","corazon"];
    mayorSeleccionado:boolean = false;
    menorSeleccionado:boolean = false;
    aciertos:number = 0;
    intentos:number = 5;
    porcentajeExito:number = 0;

    seleccionarCartaAlAzar()
    {
        if (this.mayorSeleccionado || this.menorSeleccionado)
        {
            var cartaNueva = ""
            var paloCarta = this.palos[Math.floor(Math.random() * this.palos.length)];
            var numeroAleatorio = Math.floor(Math.random() * 13) + 1;
            if (numeroAleatorio == this.numeroActual)
            {
                numeroAleatorio++;
            }
            this.numeroAnterior = this.numeroActual;
            this.numeroActual = numeroAleatorio
            this.analizarVictoria();
            cartaNueva = paloCarta + numeroAleatorio.toString();
            this.actualizarImagen(cartaNueva, paloCarta);
        }
    }

    actualizarImagen(carta:string, palo:string)
    {
        this.imagen = "/juegos/cartas/" + palo + "/" + carta + ".jpg";
        console.log(this.imagen);
    }

    activarSeleccion(seleccion:string) 
    {
        if (seleccion == "mayor")
        {
            this.mayorSeleccionado = !this.mayorSeleccionado;
            this.menorSeleccionado = false;
        }
        else if (seleccion == "menor")
        {
            this.menorSeleccionado = !this.menorSeleccionado;
            this.mayorSeleccionado = false;
        }
    }

    analizarVictoria()
    {
        if (this.mayorSeleccionado)
        {
            if (this.numeroActual > this.numeroAnterior)
            {
                this.aciertos ++;
            }
            else
            {
                this.intentos --;
            }  
        }
        else
        {
            if (this.numeroActual < this.numeroAnterior)
            {
                this.aciertos ++;
            }
            else
            {
                this.intentos --;
            } 
        }

        if (this.intentos == 0)
        {
            this.calcularPorcentajeExito();
            this.db.guardarPuntajeMayorMenor(this.auth.usuarioActual?.email!, this.aciertos+5, this.porcentajeExito)
        }
    }

    calcularPorcentajeExito():void
    {
        var porcentaje = this.aciertos / (this.aciertos + 5);
        this.porcentajeExito = Math.floor(porcentaje * 100);
    }
}


