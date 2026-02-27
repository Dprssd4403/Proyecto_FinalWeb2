import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { CursosServices } from '../../services/cursos-services';
import { InscripcionService } from '../../services/inscripcion-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscripcion.html',
})
export class InscripcionComponent implements OnInit {
  public authService = inject(AuthService);
  private cursosService = inject(CursosServices);
  private inscripcionService = inject(InscripcionService);
  private router = inject(Router);

  cursos = signal<any[]>([]);
  cursoSeleccionado = signal<any>(null);

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => this.cursos.set(data),
      error: (err) => console.error('Error al obtener cursos:', err)
    });
  }

  onCursoChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    const curso = this.cursos().find(c => c.id == id);
    this.cursoSeleccionado.set(curso);
  }

  procesarInscripcion(event: Event) {
    event.preventDefault();
    
    if (!this.cursoSeleccionado()) {
      alert('Por favor, selecciona un curso.');
      return;
    }

    const dataInscripcion = {
      usuario: { id: this.authService.getUserId() },
      curso: { id: this.cursoSeleccionado().id },
      fecha: new Date().toISOString().split('T')[0]
    };

    this.inscripcionService.guardarInscripcion(dataInscripcion).subscribe({
      next: () => {
        alert('¡Inscripción realizada con éxito!');
        this.router.navigate(['/']);
      },
      error: () => alert('Hubo un error al procesar tu inscripción.')
    });
  }
}