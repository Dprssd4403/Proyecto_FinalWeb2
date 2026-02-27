import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuarios'; // IMPORTA EL MODELO AQUÍ

@Injectable({ providedIn: 'root' })
export class UsuarioServices {
  private http = inject(HttpClient);
  private API_URL = 'https://web2-ea639-default-rtdb.firebaseio.com/usuarios';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ [key: string]: any }>(`${this.API_URL}.json`).pipe(
      map(respuesta => {
        if (!respuesta) return [];
        return Object.keys(respuesta).map(key => ({
          ...respuesta[key],
          id: isNaN(Number(key)) ? key : Number(key) 
        }));
      })
    );
  }


  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}.json`);
  }

  putUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const { id: _, ...datosSinId } = usuario; 
    return this.http.put<Usuario>(`${this.API_URL}/${id}.json`, datosSinId);
  }

  postUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}.json`, usuario);
  }
}