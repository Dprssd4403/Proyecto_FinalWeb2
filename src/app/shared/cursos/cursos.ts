import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosServices, Curso } from '../../services/cursos-services';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {
  listaCursos: Curso[] = [];
  cursosOnline: Curso = this.limpiarCurso();
  mostrarForm = false;
  editando = false;

  constructor(private cursoService: CursosServices) { }

  ngOnInit(): void { this.obtenerCursos(); }

  private limpiarCurso(): Curso {
    return {
      nombre:'',
      titulo: '',
      instructor: '',
      descripcion: '',
      categoria: '',
      ubicacion: '',
      email_contacto: '',
      imagen_url: '',
      precio: 0
    };
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(data => this.listaCursos = data);
  }

  guardar(): void {
    if (!this.cursosOnline.titulo || !this.cursosOnline.precio) return;

    const operacion = this.editando && this.cursosOnline.id
      ? this.cursoService.updateCurso(this.cursosOnline.id, this.cursosOnline)
      : this.cursoService.addCurso(this.cursosOnline);

    operacion.subscribe(() => {
      this.obtenerCursos();
      this.cerrarForm();
    });
  }

  borrarCurso(id: number | undefined): void {
    if (id && confirm('¿Deseas eliminar este curso de forma permanente?')) {
      this.cursoService.deleteCurso(id).subscribe(() => this.obtenerCursos());
    }
  }

  abrirForm() {
    this.editando = false;
    this.cursosOnline = this.limpiarCurso();
    this.mostrarForm = true;
  }

  editarForm(curso: Curso) {
    this.editando = true;
    this.cursosOnline = { ...curso };
    this.mostrarForm = true;
  }

  cerrarForm() {
    this.mostrarForm = false;
  }
}