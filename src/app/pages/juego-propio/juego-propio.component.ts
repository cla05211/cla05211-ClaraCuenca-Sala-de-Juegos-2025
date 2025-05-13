import { Component, HostListener, inject } from '@angular/core';
import ataquesData from '../../../assets/data/ataques.json'
import { Ataque } from '../../classes/ataque';
import { CommonModule } from '@angular/common';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';
import { ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-juego-propio',
  imports: [CommonModule],
  templateUrl: './juego-propio.component.html',
  styleUrl: './juego-propio.component.css'
})
export class JuegoPropioComponent 
{
    @ViewChild('contadorRef') contadorElement!: ElementRef;
    @ViewChildren('palabrasRef') palabrasElementos!: QueryList<ElementRef>;
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) 
    {
        const tecla = event.key;

        if (/^[a-zA-ZñÑ]$/.test(tecla)) {
        this.letrasIngresadas.push(tecla.toLowerCase());
        this.analizarIngresoLetras();
        }
    }

    db = inject(DataBaseService);
    auth = inject(AuthService);
    partidaEnCurso = false;
    tiempoPartida: number = 0;
    vidaEnemigo: number = 100;
    palabrasPosibles: Array<string> = ataquesData;
    palabrasEnPantalla: Array<{ id: string; texto: string, left: number, top: number }> = [];
    letrasIngresadas: Array<string> = [];
    palabrasIngresadas: Array<string> = ["","","","","",""];
    victoria : boolean | null = null;
    animacionPalabras = false;
    imagenJugador:string = "/juegos/juegoPropio/jugador.png";
    imagenEnemigo:string = "/juegos/juegoPropio/enemigo.png";
    palabrasAcertadas: number = 0;
    letrasErradas: number = 0;
    tiempoRestante: number = 30; 
    tiempoRestantePalabras:number = 8;
    intervalo: any;
    intervaloPalabras: any;

    elegirPalabrasPantalla()
    {
        this.palabrasEnPantalla = [];
        const posiciones = 
        [
            { top: 120, left: 0 },
            { top: 60, left: 10 },
            { top: 0, left: 80 },
            { top: 0, left: 360 },
            { top: 60, left: 430 },
            { top: 120, left: 440 }
        ];

        for (let index = 0; index < 6; index++) 
        {
            var indice = Math.floor(Math.random() * this.palabrasPosibles.length);
            const palabra = this.palabrasPosibles[indice];
            const posicion = posiciones[index];

            this.palabrasEnPantalla.push({
            id: Math.random().toString(36).substring(2), 
            texto: palabra,
            top: posicion.top,
            left: posicion.left
            });
        }
        this.iniciarContadorPalabras();
    }

    ngOnInit() 
    {
        this.elegirPalabrasPantalla();
        this.iniciarContadorPalabras();
    }

    reiniciarPartida()
    {
        clearInterval(this.intervalo);
        this.partidaEnCurso = true;
        this.vidaEnemigo = 100;
        this.tiempoPartida = 0;
        this.victoria = null
        this.palabrasAcertadas = 0;
        this.letrasErradas = 0;
        this.iniciarContador();
    }

    obtenerPosicion(palabra: string) 
    {
        const top = Math.floor(Math.random() * 5); 
        const left = Math.floor(Math.random() * 5); 
        return {
          top: `${top}px`,
          left: `${left}px`
        };
    }

    analizarIngresoLetras()
    {
        var indiceLetra = 0;
        var vaBien = false;
        var acertoAlgunaLetra = false;

            for (let indicePalabra = 0; indicePalabra < this.palabrasEnPantalla.length; indicePalabra++) 
            {        
                for (let i = 0; i < this.letrasIngresadas.length; i++) 
                {
                    if (this.letrasIngresadas[i] == this.palabrasEnPantalla[indicePalabra].texto[indiceLetra])
                    {
                        this.palabrasIngresadas[indicePalabra] = this.letrasIngresadas.join('');
                        vaBien = true;
                        indiceLetra ++;
                    }
                    else
                    {
                        this.palabrasIngresadas[indicePalabra] = "";
                        vaBien = false;
                        break;
                    }
                }
                indiceLetra = 0;
                if (vaBien)
                {
                    this.palabrasIngresadas[indicePalabra] = this.letrasIngresadas.join('');
                    console.log("vasBien");
                    acertoAlgunaLetra = true;
                    this.determinarPalabraCorrecta();
                }
            }
            if (!acertoAlgunaLetra)
            {
                this.cambiarImagenJugador();
                this.letrasErradas += 1;
                this.descontarTiempo();
                this.letrasIngresadas = [];
            }
    }

    determinarPalabraCorrecta()
    {
        var daño = 0;
        var i = 0;
        
        this.palabrasEnPantalla.forEach(palabra=>
        {
            if (this.letrasIngresadas.join('') == palabra.texto)
            {
                this.palabrasIngresadas[i] = "";
                daño =+ 10;
                this.palabrasAcertadas += 1;
                this.cambiarImagenEnemigo();
                this.remplazarPalabra(palabra.texto);
                this.letrasIngresadas = [];
            }
            i++;
        })

        if (daño > 20)
            {
                var golpes= daño /10;
                for (let i = 0; i < golpes -1; i++) 
                {
                    this.cambiarImagenEnemigo();
                }
                
            }
        this.vidaEnemigo -= daño;

        this.determinarVictoria();
    }

    cambiarImagenEnemigo()
    {
        this.imagenEnemigo = '/juegos/juegoPropio/enemigo_daño.png';

        setTimeout(() => {
        this.imagenEnemigo = "/juegos/juegoPropio/enemigo.png";
        }, 200);
    } 

    cambiarImagenJugador()
    {
        this.imagenJugador = '/juegos/juegoPropio/jugador_daño.png';

        setTimeout(() => {
        this.imagenJugador = "/juegos/juegoPropio/jugador.png";
        }, 200);
    } 

  descontarTiempo()
  {
        this.tiempoRestante = Math.max(0, this.tiempoRestante - 2);
        this.contadorElement.nativeElement.style.color = 'red';

        setTimeout(() => {
        this.contadorElement.nativeElement.style.color = 'black';
        }, 400);
  }
    

    async determinarVictoria()
    {
        if (this.vidaEnemigo < 1)
        {
            clearInterval(this.intervalo);
            this.palabrasEnPantalla = [];
            await this.esperar(1500);
            this.victoria = true;
            this.db.guardarPuntajeJuegoPropio(this.auth.usuarioActual?.email!, this.letrasErradas, this.palabrasAcertadas);
        }
    }


    remplazarPalabra(palabra: String)
    {
        for (let index = 0; index < 6; index++) 
        {
            if (this.palabrasEnPantalla[index].texto == palabra)
            {
                var indice = Math.floor(Math.random() * this.palabrasPosibles.length);
                if (this.palabrasPosibles[indice] != palabra)
                {
                    this.palabrasEnPantalla[index].texto = this.palabrasPosibles[indice];
                }
            }
        }
    }

    trackById(index: number, item: { id: string; texto: string }) 
    {
        return item.id;
    }

    get anchoBarraVida(): string 
    {
    const porcentaje = this.vidaEnemigo;
    return `${porcentaje}%`;
    }

    esperar(milisegundos: number) 
    {
        return new Promise(resolve => setTimeout(resolve, milisegundos));
    }

    iniciarContador()
    {
        this.tiempoRestante = 30;
        clearInterval(this.intervalo);

        this.intervalo = setInterval(async() => {
            this.tiempoRestante--;

            if (this.tiempoRestante <= 0) 
            {
                clearInterval(this.intervalo);
                if (!this.victoria) 
                {
                    await this.esperar(1500);
                    this.victoria = false;
                }
            }
        }, 1000);
    }

    iniciarContadorPalabras()
    {
        this.animacionPalabras = true;

        this.tiempoRestantePalabras = 8;
        clearInterval(this.intervaloPalabras);

        this.intervaloPalabras = setInterval(async() => {
            this.animacionPalabras = false;
            this.tiempoRestantePalabras--;

            if (this.tiempoRestantePalabras == 1 || this.tiempoRestantePalabras == 2)
            {
                this.palabrasElementos.forEach((elementRef) => {
                elementRef.nativeElement.classList.add('titilar');

                setTimeout(() => {
                    elementRef.nativeElement.classList.remove('titilar');
                }, 100);
                });
            }

            if (this.tiempoRestantePalabras <= 0) 
            {
                this.animacionPalabras = true;
                clearInterval(this.intervaloPalabras);
                this.elegirPalabrasPantalla();
            }
        }, 1000);
    }
}
