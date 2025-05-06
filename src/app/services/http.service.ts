import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService 
{
    httpClient = inject(HttpClient);

   traerImagenPokemon(nombrePokemon: string) 
   {
        const observable = this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon).pipe(
        map(data => ({
            imagen: data.sprites.other['official-artwork'].front_default,
        })
        ));

        return observable;
   }

   traerNombrePokemon(idPokemon: number) 
   {
        const observable = this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/" + idPokemon).pipe(
        map(data => ({
            nombre: data.name,
        })
        ));

        return observable;
   }

   traerPokemonesPrimeraGeneracion() {
    return this.httpClient.get<any>('https://pokeapi.co/api/v2/generation/1').pipe(
      map(data =>
        data.pokemon_species.map((p: any) => ({
          nombre: p.name,
        }))
      )
    );
  }
  

}

