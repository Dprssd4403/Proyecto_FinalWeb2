import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  id?: number;
  nombre: string;
  titulo?: string;
  instructor: string;
  descripcion: string;
  categoria: string;
  ubicacion: string;
  email_contacto: string;
  imagen_url: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class CursosServices {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://698e88f0aded595c253214cc.mockapi.io/Cursos';

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.getCursos();
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.API_URL, curso);
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.API_URL}/${id}`, curso);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}