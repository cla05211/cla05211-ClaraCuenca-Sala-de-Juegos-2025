import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.usuarioActual === null)
    {
        router.navigateByUrl("/login");
        return false;
    }
    else
    {
        return true;
    }
};
