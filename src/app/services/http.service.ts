import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService 
{
    httpClient = inject(HttpClient);

   traerDatosPokemon(idPokemon: number) 
   {
        const observable = this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon/" + idPokemon).pipe(
        map(data => ({
            nombre: data.name,
            imagen: data.sprites.other['official-artwork'].front_default,
        })
        ));

        return observable;
   }

}

