import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.sesionIniciada() && authService.getRole() === 'ROLE_ADMIN') {
    return true;
  }
  
  console.warn('Acceso denegado: Se requiere rol ADMIN');
  return router.parseUrl('/login');
};