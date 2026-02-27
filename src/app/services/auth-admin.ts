import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthAdmin {
  constructor() {}

  // Este método verifica si el usuario en localStorage es ADMIN
  isAdmin(): boolean {
    const userJson = localStorage.getItem('user'); // O como guardes tu sesión
    if (!userJson) return false;
    
    const user = JSON.parse(userJson);
    return user.rol === 'ADMIN';
  }
}