import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SonidoService {

  reproducirSonido(ruta: string, velocidad: number = 1): void {
    const audio = new Audio(ruta);
    audio.playbackRate = velocidad; 
    audio.play().catch(e => {
      console.error('Error al reproducir sonido:', e);
    });
  }
}
