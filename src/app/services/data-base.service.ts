import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Usuario } from '../classes/usuarios';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

    sb = inject(SupabaseService)
    supabase: SupabaseClient<any, "public", any>;
    tablaUsuarios;

    constructor() 
        {
        this.supabase = createClient("https://cnoklpjbfxuwneivmjcq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNub2tscGpiZnh1d25laXZtamNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDM0NjksImV4cCI6MjA2MDM3OTQ2OX0.aj3dhviaREaCSTYSUUwxaJUgjxIcPBQCYWIH-n0S_pk");
        this.tablaUsuarios = this.supabase.from("usuarios");
    }

    async listarUsuarios()
    {
        const {data, error} = await this.supabase.from("usuarios").select("*");
        return data as Usuario[];
    }
    
    async crear(usuario: Usuario)
    {
        return await this.supabase.from("usuarios").insert(usuario);
    }

    async modificar(usuario:Usuario)
    {
        const {data, error} = await this.supabase.from("usuarios").update(usuario).eq("correo",usuario.correo);
    }

    async eliminar(correo: String)
    {
        const {data, error} = await this.supabase.from("usuarios").delete().eq("correo", correo);
    }

    async guardarPuntajeAhorcado(usuario:string,tiempo:number,numeroLetras:number)
    {
        return await this.supabase.from("puntajesAhorcado").insert([{
            usuario: usuario,
            tiempo: tiempo,
            numeroLetrasErradas: numeroLetras,
            fecha: new Date().toISOString()
        }]);
    }

    async guardarPuntajeMayorMenor(usuario:string,cantidadCartasJugadas:number,porcentajeExito:number)
    {
        return await this.supabase.from("puntajesMayorMenor").insert([{
            usuario: usuario,
            cartas: cantidadCartasJugadas,
            porcentajeExito: porcentajeExito, 
            fecha: new Date().toISOString()
        }]);
    }

    async guardarPuntajeJuegoPropio(usuario:string,letrasErradas:number,palabrasEscritas:number)
    {
        return await this.supabase.from("puntajesJuegoPropio").insert([{
            usuario: usuario,
            letrasErradas: letrasErradas,
            palabrasEscritas: palabrasEscritas, 
            fecha: new Date().toISOString()
        }]);
    }

    async guardarPuntajePreguntados(usuario:string,pokemonesAdivinados:number, tiempo:number)
    {
        return await this.supabase.from("puntajesPreguntados").insert([{
            fecha: new Date().toISOString(),
            pokemonesAdivinados: pokemonesAdivinados,
            usuario: usuario,
            tiempo: tiempo,
        }]);
    }

    async listarPuntajes(tabla:string)
    {
        const {data, error} = await this.supabase.from(tabla).select("*");
        return data as any[];
    }

    async listarChat()
    {
        const {data, error} = await this.supabase.from("chat").select("id, mensaje, created_at, usuarios(correo, nombre)");
        return data as any[];
    }

    async enviarChat(usuario:string, mensaje:string)
    {
        return await this.supabase.from("chat").insert([{
            usuario: usuario,
            mensaje: mensaje,
            created_at: new Date().toISOString()}]);
    }

    async determinarSiYaJugo(correo:string, ):Promise<boolean>
    {
        var jugo = false;

        const {data, error} = await this.supabase.from("puntajesJuegoPropio").select("usuario");

        if (data != null) 
        {
            for (const item of data) 
            {
                if (item.usuario === correo) 
                {
                    jugo = true;
                }
            }
        }
        
        return jugo;
    }
}

