
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/inscripciones';

  guardarInscripcion(inscripcion: any): Observable<any> {
    return this.http.post<any>(this.API_URL, inscripcion);
  }
}