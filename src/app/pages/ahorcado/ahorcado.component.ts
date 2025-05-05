import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent 
{
    db = inject(DataBaseService);
    auth = inject(AuthService);
    partidaIniciada: boolean = false;
    palabraJuego:string = "";
    categoriaPalabra:string = "";
    posiblesCategorias = ['ANIMALES','COMIDAS','ACCIONES'];
    animales = ["PERRO", "GATO", "LEON", "OSO", "RANA", "PEZ", "VACA", "CERDO", "CABALLO", "TIGRE"];
    acciones = ["CORRER", "SALTAR", "COMER", "DORMIR", "LEER", "ESCRIBIR", "JUGAR", "BAILAR", "CANTAR", "HABLAR"];
    comidas = ["PIZZA", "PAN", "ARROZ", "SOPA", "MANZANA", "HUEVO", "LECHE", "CARNE", "QUESO", "TORTA"];;
    letrasErradas:Array<string>=[];
    abecedario: Array<string> = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    letrasIngresadas: Array<string> = [];
    partidaFinalizada:boolean = false;
    victoria:boolean = false;
    imagen:string = "/juegos/ahorcado/0.png";
    tiempoPartida:number = 0;
    intervalo:any;
    

    iniciarPartida():void
    {
        this.partidaIniciada = true;
        this.categoriaPalabra = this.posiblesCategorias[Math.floor(Math.random() * this.posiblesCategorias.length)];
        if (this.categoriaPalabra == "ANIMALES")
        {
            this.palabraJuego = this.animales[Math.floor(Math.random() * this.animales.length)];
        }
        else if (this.categoriaPalabra == "COMIDAS")
        {
            this.palabraJuego = this.comidas[Math.floor(Math.random() * this.comidas.length)];
        }
        else if (this.categoriaPalabra == "ACCIONES")
        {
            this.palabraJuego = this.acciones[Math.floor(Math.random() * this.acciones.length)];
        }
        console.log(this.palabraJuego);
        this.letrasIngresadas.length = 0;
        for (const letra of this.palabraJuego)
        {
            this.letrasIngresadas.push("_");
        }
        this.partidaFinalizada = false;
        this.victoria = false;
        this.letrasErradas.length = 0;
        this.determinarImagen();
        this.iniciarContador();
    }

    iniciarContador()
    {
        this.tiempoPartida = 0;
        this.intervalo = setInterval(() => 
        {
            this.tiempoPartida++;
        }, 1000); 
    }

    detenerContador(): void 
    {
        clearInterval(this.intervalo);
    }

    determinarLetraCorrecta(letraIngresada:string)
    {
        var acerto: boolean = false;

        for (const [index, letraCorrecta] of Array.from(this.palabraJuego).entries()) 
        {
            if (letraIngresada == letraCorrecta)
            {
                this.ingresarLetra(letraIngresada, index);
                console.log(this.letrasIngresadas);
                acerto = true;
            }
        }
        if (!acerto && (!this.letrasIngresadas.includes(letraIngresada) && !this.letrasErradas.includes(letraIngresada)))
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
            this.detenerContador();
            this.victoria = true;
            this.db.guardarPuntajeAhorcado(this.auth.usuarioActual?.email!, this.tiempoPartida, this.letrasErradas.length)
        }
    }

    ahorcar(letraIngresada:string)
    {
        this.letrasErradas.push(letraIngresada);
        this.determinarImagen();

        if(this.letrasErradas.length > 6)
        {
            this.partidaFinalizada = true;
            this.detenerContador();
        }
    }

    determinarImagen()
    {
        var rutaBase:string = "/juegos/ahorcado/"
        this.imagen = rutaBase + (this.letrasErradas.length).toString() + ".png";    
    }

    formatearTiempo(segundos: number): string 
    {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min}:${seg.toString().padStart(2, '0')}`;
    }


}
