import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Usuario {
  password?: string;
  name: string;
  id?: string;
  email: string;
  phone: string;
  curso?: string;
  fecha?: string;
  rol: 'ADMIN' | 'EMPLEADO';
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioServices {
  private http = inject(HttpClient);

  private API_URL = 'https://web2-ea639-default-rtdb.firebaseio.com/usuarios'


  //Metodo Get
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ [key: string]: Usuario }>(`${this.API_URL}.json`).pipe(
      map(respuesta => {
        if (!respuesta) {
          return [];
        }
        return Object.keys(respuesta).map(id => {
          const usuarioConId = { ...respuesta[id], id: id };
          return usuarioConId;
        });
      })
    )
  }

  //Metodo Post
  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}.json`, usuario);
  }

  //Metodo buscarPorId
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}.json`);
  }

  //Metodo Actualizar (Put)
  putUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}.json`, usuario);
  }

  //Metodo Eliminar (Delete)
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}.json`);
  }

  // Metodo para actualizar parcialmente (opcional, útil para cambiar solo el rol)
  patchUsuario(id: string, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.API_URL}/${id}.json`, cambios);
  }
}