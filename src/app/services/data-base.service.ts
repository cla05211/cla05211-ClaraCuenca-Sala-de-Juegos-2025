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
            numeroLetrasErradas: numeroLetras}]);
    }

    async guardarPuntajeMayorMenor(usuario:string,cantidadCartasJugadas:number,porcentajeExito:number)
    {
        return await this.supabase.from("puntajesMayorMenor").insert([{
            usuario: usuario,
            cartas: cantidadCartasJugadas,
            porcentajeExito: porcentajeExito}]);
    }

    async listarChat()
    {
        const {data, error} = await this.supabase.from("chat").select("*").order("created_at", { ascending: true }).limit(20);
        return data;
    }

    async enviarChat(usuario:string, mensaje:string)
    {
        return await this.supabase.from("chat").insert([{
            usuario: usuario,
            mensaje: mensaje,
            created_at: new Date().toISOString()}]);
    }
}

