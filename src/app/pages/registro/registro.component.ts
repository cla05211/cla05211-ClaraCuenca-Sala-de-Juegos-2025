import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../classes/usuarios';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    auth = inject(AuthService)
    router = inject(Router);
    db = inject(DataBaseService);
    verClave: boolean = false;

    toggleClave(): void 
    {
    this.verClave = !this.verClave;
    }

    formularioRegistro = new FormGroup
    ({
        correo: new FormControl('',[Validators.required,Validators.email]),
        contraseña: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern('^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü]+$')]),
        edad: new FormControl('',[Validators.required, Validators.max(99), Validators.min(5), Validators.pattern('^[0-9]*$')]),
        nombre: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$')]),
        apellido: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$')]),
    })

    verficarCampo(controlName: string): string | null 
    {
        const control = this.formularioRegistro.get(controlName);
        var mensaje = null;

        if (control?.touched) 
        {
          if (control.hasError('required')) {mensaje = 'Este campo es obligatorio.'};
          if (control.hasError('email')) {mensaje = 'Debe ser un correo válido.'};
          if (control.hasError('minlength')) {mensaje = 'El dato ingresado es muy corto.'};
          if (control.hasError('maxlength')) {mensaje = 'El dato ingresado es muy largo.'};
          if (control.hasError('max')) {mensaje = 'Ingrese una edad válida'};
          if (control.hasError('min')) {mensaje = 'Minimo de edad 5 años'};
          if (control.hasError('pattern')) {mensaje = 'Formato inválido.'};
        }
        return mensaje;
    }

    async agregarUsuario()
    {
        if (this.formularioRegistro.invalid) 
        {
            this.formularioRegistro.markAllAsTouched();
        }
        else
        {
            this.registrar();
        }
    }


    async registrar()
    {
        const correo = String(this.formularioRegistro.get('correo')?.value);
        const contraseña = String(this.formularioRegistro.get('contraseña')?.value);

        const {data, error} = await this.auth.CrearCuenta(correo, contraseña);
        console.log('ERROR:', error); 
        
        if (error) 
        {
            const mensaje = error.message.toLowerCase();

            if (
                error.status === 409 ||
                mensaje.includes('already registered') ||
                mensaje.includes('already exists')
            ) 
            {   
                Swal.fire({
                icon: 'warning',
                title: 'Usuario ya registrado',
                text: 'El correo ingresado ya está en uso.',
                confirmButtonText: 'Entendido',
                });
            } 
            else 
            {
                Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: error.message,
                confirmButtonText: 'Cerrar',
                });
            }
        }
        else 
        {
            this.agregarUsuarioBD();
            await this.auth.IniciarSesion(correo, contraseña);
            this.router.navigate(['/home']);
        }
    }
    

    async agregarUsuarioBD()
    {
        const correo = String(this.formularioRegistro.get('correo')?.value);
        const nombre = (String(this.formularioRegistro.get('nombre')?.value)).toLowerCase();
        const apellido = (String(this.formularioRegistro.get('apellido')?.value)).toLowerCase();
        const edad = Number(this.formularioRegistro.get('edad')?.value);

        const usuario = new Usuario(correo,nombre,apellido,edad);
        const {data, error} = await this.db.crear(usuario); 
        
        if (error)
        {
            alert(error.message)
        }
    }
    
}
