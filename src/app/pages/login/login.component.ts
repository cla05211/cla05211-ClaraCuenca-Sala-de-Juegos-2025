import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    auth = inject(AuthService)
    router = inject(Router);
    verClave: boolean = false;

    toggleClave(): void 
    {
    this.verClave = !this.verClave;
    }

    formularioLogin = new FormGroup
    ({
        correo: new FormControl('',[Validators.required,Validators.email]),
        contraseña: new FormControl('',[Validators.required, Validators.minLength(5),Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$')])
    })

    verficarCampo(controlName: string): string | null 
    {
        const control = this.formularioLogin.get(controlName);
        var mensaje = null;

        if (control?.touched) 
        {
          if (control.hasError('required')) {mensaje = 'Este campo es obligatorio.'};
          if (control.hasError('email')) {mensaje = 'Debe ser un correo válido.'};
          if (control.hasError('minlength')) {mensaje = 'El dato ingresado es muy corto.'};
          if (control.hasError('maxlength')) {mensaje = 'El dato ingresado es muy largo.'};
          if (control.hasError('pattern')) {mensaje = 'Formato inválido.'};
        }
        return mensaje;
    }

    async iniciarSesion()
    {
        if (this.formularioLogin.invalid) 
        {
            this.formularioLogin.markAllAsTouched();
        }
        else
        {
            const correo = String(this.formularioLogin.get('correo')?.value);
            const contraseña = String(this.formularioLogin.get('contraseña')?.value);
    
            const {data, error} = await this.auth.IniciarSesion(correo, contraseña);
    
            if (error)
            {
                alert(error.message);
            }
            else
            {
                this.router.navigate(['/home']);
            }
        }
    }

    completarAccesoRapido(perfil: number)
    {
        if (perfil == 1)
            {
                this.formularioLogin.get('correo')?.setValue("prueba1@gmail.com");
            }
        else if (perfil == 2)
            {
                this.formularioLogin.get('correo')?.setValue("prueba2@gmail.com");
            }
        else if (perfil == 3)
            {
                this.formularioLogin.get('correo')?.setValue("prueba3@gmail.com");
            }
        
        this.formularioLogin.get('contraseña')?.setValue("contraseña");
    }

}
