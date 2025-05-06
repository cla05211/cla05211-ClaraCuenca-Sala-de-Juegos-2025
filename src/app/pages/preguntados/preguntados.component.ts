import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Pokemon } from '../../classes/pokemon';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';

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

    pokemonesPosibles: Pokemon[] = [];
    pokemonCorrecto: Pokemon|null = null;
    pokemonSeleccionadoIndex = 0;
    partidaEnCurso = false;
    respuestaCorrecta: boolean|null = null;
    rondas: number = 10;
    rondasGanadas: number = 0;
    tiempoPartida:number = 0;
    intervalo:any;
    cantidadPokemons = 151;

    async iniciarPartida()
    {
        this.pokemonesPosibles = [];
        this.elegirPokemonesAlAzar();

        await new Promise(resolve => setTimeout(resolve, 400));
        this.elegirPokemonCorrecto();
        this.partidaEnCurso = true;
        this.respuestaCorrecta = false;
        if (this.rondas == 10)
        {
            this.iniciarContador();
        }
    }


    elegirPokemonCorrecto()
    {
        var index = Math.floor(Math.random() * 4);
        this.pokemonCorrecto = this.pokemonesPosibles[index];
    }

    async elegirPokemonesAlAzar()
    {
        for (let index = 0; index < 4; index++) 
        {
            var idPokemon = this.elegirIdPokemon();

            this.httpService.traerDatosPokemon(idPokemon).subscribe(data => {
                this.pokemonesPosibles.push({
                    nombre: data.nombre,
                    imagen: data.imagen});
                    console.log(data.nombre + data.imagen);
              });
        }
    }

    elegirIdPokemon(): number
    {
        var idPokemon: number = Math.floor(Math.random() * ((this.cantidadPokemons + 1) - 1) + 1);

        return idPokemon
    }

    comprobarResultado()
    {
        this.rondas --;
        this.partidaEnCurso = false;
        if (this.pokemonCorrecto?.nombre == this.pokemonesPosibles[this.pokemonSeleccionadoIndex].nombre)
        {
            this.rondasGanadas ++;
            this.respuestaCorrecta = true;
        }

        if (this.rondas == 0)
        {
            this.detenerContador();
            this.guardarPuntaje();
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
}
