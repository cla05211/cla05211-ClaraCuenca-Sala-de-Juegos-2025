import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    sb = inject(SupabaseService)
    usuarioActual: User | null = null;
    router = inject(Router);

  constructor() 
  {
    this.sb.supabase.auth.onAuthStateChange((event, session)=>
        {
            console.log(event,session);
            if(session)
            {
                this.usuarioActual = session.user
            }
            else
            {
                this.usuarioActual = null
            }
        })
   }

  //Crear cuenta
  async CrearCuenta(correo:string, contraseña:string)
    {
        return await this.sb.supabase.auth.signUp({email:correo, password:contraseña});
    }
  //Iniciar Sesion
  async IniciarSesion(correo:string, contraseña:string)
    {
    return await this.sb.supabase.auth.signInWithPassword({email:correo, password:contraseña});
    }
  //Cerrar Sesion
  async CerrarSesion()
  {
  const {error} = await this.sb.supabase.auth.signOut({});
  }
  //Saber si hay usuario logueado
}
