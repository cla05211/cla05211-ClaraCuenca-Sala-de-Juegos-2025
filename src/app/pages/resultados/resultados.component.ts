import { Component, inject } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent 
{
    db = inject(DataBaseService);

    tablaElegida = "puntajesPreguntados";
    clave1:string = "";
    clave2: string = "";
    valor1: Array<any> = [];
    valor2: Array<any> = [];
    dataTabla:any = {};

    ngOnInit()
    {
        this.obtenerValores();
    }

    async obtenerValores()
    {
        this.dataTabla = await this.db.listarPuntajes(this.tablaElegida);
        this.clave1 = "Pokemones Adivinados"
        this.clave2= "Tiempo";

        if(this.tablaElegida == "puntajesPreguntados")
        {
            this.valor1 = this.dataTabla.map((fila: any) => fila.pokemonesAdivinados);
            this.valor2 = this.dataTabla.map((fila: any) => this.formatearTiempo(fila.tiempo));
        }
        else if (this.tablaElegida == "puntajesAhorcado")
        {
            this.clave1 = "Letras Erradas"
            this.valor1 = this.dataTabla.map((fila: any) => fila.numeroLetrasErradas);
            this.valor2 = this.dataTabla.map((fila: any) => this.formatearTiempo(fila.tiempo));
        }
        else if (this.tablaElegida == "puntajesMayorMenor")
        {
            this.clave1 = "Nro Cartas";
            this.clave2 = "Porcentaje de Aciertos"
            this.valor1 = this.dataTabla.map((fila: any) => fila.cartas);
            this.valor2 = this.dataTabla.map((fila: any) => fila.porcentajeExito + '%');
        }
        else if (this.tablaElegida == "puntajesJuegoPropio")
        {
            this.clave1 = "Letras Erradas";
            this.clave2 = "Palabras Tipeadas"
            this.valor1 = this.dataTabla.map((fila: any) => fila.letrasErradas);
            this.valor2 = this.dataTabla.map((fila: any) => fila.palabrasEscritas);
        }
    }

    formatearTiempo(segundos: number): string 
    {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    }

}
