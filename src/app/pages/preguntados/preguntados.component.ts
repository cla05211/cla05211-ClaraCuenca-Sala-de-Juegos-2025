import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Pokemon } from '../../classes/pokemon';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent 
{
    db = inject(DataBaseService);
    auth = inject(AuthService);
    httpService = inject(HttpService);

    pokemonesRonda: Array<any> = [];
    pokemonCorrecto: Pokemon|null = null;
    pokemonSeleccionadoIndex = 0;
    partidaEnCurso = false;
    respuestaCorrecta: boolean|null = null;
    rondas: number = 10;
    rondasEstados: Array<string>= []
    rondasGanadas: number = 0;
    tiempoPartida:number = 0;
    intervalo:any;
    pokemonesPrimerGeneracion: Array<any>= [];
    nombreMostrado:string|undefined = "¿?";


    async iniciarPartida()
    {
        if (this.rondas == 10)
        {
            this.partidaEnCurso = true;
            await this.cargarPokemonesPrimerGen();
            this.iniciarContador();
            this.rondasEstados = []
            for (let index = 0; index < 10; index++) 
            {
                this.rondasEstados.push("pendiente");
            }
        }
        this.pokemonesRonda = [];
        this.elegirPokemonesAlAzar();
        await this.elegirPokemonCorrecto();
        this.respuestaCorrecta = false;
        this.nombreMostrado = "¿?";
    }

    reintentar()
    {
        this.rondas = 10;
        this.iniciarPartida();
    }

    async cargarPokemonesPrimerGen()
    {
        this.pokemonesPrimerGeneracion = await firstValueFrom(
            this.httpService.traerPokemonesPrimeraGeneracion()
        );
    }

    async elegirPokemonCorrecto()
    {
        var imagenFunciona = false;
        while (!imagenFunciona)
        {
            var index = Math.floor(Math.random() * 4);
            var nombrePokemonElegido = this.pokemonesRonda[index];
            const data = await firstValueFrom(this.httpService.traerImagenPokemon(nombrePokemonElegido));
            
            imagenFunciona = await this.comprobarImagen(data.imagen);

            if(imagenFunciona)
            {
                this.pokemonCorrecto = 
                {
                    nombre: nombrePokemonElegido,
                    imagen: data.imagen
                };
            }
        }
    }

    elegirPokemonesAlAzar()
    {
        for (let index = 0; index < 4; index++) 
        {
            var idPokemon = this.elegirIdPokemon();
            this.pokemonesRonda.push(this.pokemonesPrimerGeneracion[idPokemon].nombre); 
        }

        console.log(this.pokemonesRonda);
    }

    elegirIdPokemon(): number 
    {
        return Math.floor(Math.random() * this.pokemonesPrimerGeneracion.length);
    }

    async comprobarResultado()
    {
        this.nombreMostrado = this.pokemonCorrecto?.nombre;
        this.rondas --;
        const respuestaCorrecta = this.pokemonCorrecto?.nombre == this.pokemonesRonda[this.pokemonSeleccionadoIndex];
        this.rondasEstados[9 - this.rondas] = respuestaCorrecta ? 'acertado' : 'fallado';

        if (respuestaCorrecta)
        {
            this.rondasGanadas ++;
            this.respuestaCorrecta = true;
        }

        if (this.rondas == 0)
        {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.partidaEnCurso = false;
            this.detenerContador();
            this.guardarPuntaje();
        }
        else
        {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.iniciarPartida();
        }
    }

    guardarPuntaje()
    {
        this.db.guardarPuntajePreguntados(this.auth.usuarioActual?.email!, this.rondasGanadas, this.tiempoPartida);
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

    formatearTiempo(segundos: number): string 
    {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    }

    comprobarImagen(url: string): Promise<boolean> 
    {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);  
            img.onerror = () => resolve(false);  
            img.src = url;  
        });
    }

}
