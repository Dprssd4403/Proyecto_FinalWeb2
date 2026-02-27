import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuarioServices } from './usuario-services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private servicioUsuario = inject(UsuarioServices);

  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  getUserName(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.name || userData.nombre || 'Usuario';
    }
    return 'Invitado';
  }

  getUserEmail(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).email : '';
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    return user ? Number(JSON.parse(user).id) : 0;
  }

 
  getRole(): string | null {
    return this.rolActual();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(
          u => u.email === email && u.password === password
        );

        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true');
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));
          localStorage.setItem('rol', usuarioCoincide.rol);
          
          this.sesionIniciada.set(true);
          this.rolActual.set(usuarioCoincide.rol);

          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
  }
}