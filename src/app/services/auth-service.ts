import { email } from '@angular/forms/signals';
import { inject, Injectable, signal } from '@angular/core';
import { getAuth, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { UsuarioServices } from './usuario-services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioServices);

  //localStorage
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');
  
  usuario: User | null = null;

  //Accedemos al rol del usuario
  rolActual = signal<string | null>(localStorage.getItem('rol'))

  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true')
          //GUARDAR ESTOS DATOS CONVIRTIENDO EL OBJETO JSON A TEXTO
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));

          //guardar el rol
          localStorage.setItem('rol', usuarioCoincide.rol);
          this.sesionIniciada.set(true);

          return true;
        }
        return false;
      })
    )
  }

  logout() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.sesionIniciada.set(false);
    this.rolActual.set(null);
  }

}
