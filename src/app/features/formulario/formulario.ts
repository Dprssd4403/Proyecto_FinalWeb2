import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuarios'; 
import { AuthService } from '../../services/auth-service';
import { Salir } from '../../guards/deactive-guard';
import { UsuarioServices } from '../../services/usuario-services';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit, Salir {

  private servicioUsuario = inject(UsuarioServices);
  public servicioAuth = inject(AuthService); 
  private router = inject(Router);

  listaUsuarios = signal<Usuario[]>([]);
  editando = false;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    phone: '',
    password: '',
    curso: '',
    fecha: '',
    rol: 'ROLE_EMPLEADO'
  };

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.servicioUsuario.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.listaUsuarios.set(usuarios);
      },
      error: (err: any) => console.error('Error al cargar usuarios:', err)
    });
  }

  guardarUsuario() {
    const accion = this.editando ? 'actualizar' : 'registrar';
    
    if (confirm(`¿Estás seguro de que deseas ${accion} a este usuario?`)) {
      if (this.editando && this.nuevoUsuario.id) {
        this.servicioUsuario.putUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe({
          next: () => this.finalizarYSalir(),
          error: (err: any) => console.error('Error al actualizar:', err)
        });
      } else {
        this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe({
          next: () => this.finalizarYSalir(),
          error: (err: any) => console.error('Error al registrar:', err)
        });
      }
    }
  }

  private finalizarYSalir() {
    this.obtenerUsuarios();
    this.resetear();
    this.router.navigate(['/']);
  }


  eliminarUsuario(id: number) { 
  if (confirm('¿Desea eliminar el registro?')) {
    this.servicioUsuario.deleteUsuario(id).subscribe({
      next: () => {
        this.listaUsuarios.set(this.listaUsuarios().filter(u => u.id !== id));
      },
      error: (err: any) => console.error('Error al eliminar:', err)
    });
  }
}

  seleccionarParaEditar(user: Usuario) {
    this.editando = true;
    this.nuevoUsuario = { ...user };
  }

  resetear() {
    this.editando = false;
    this.nuevoUsuario = { 
      name: '', 
      email: '', 
      phone: '', 
      password: '', 
      curso: '',
      fecha: '',
      rol: 'ROLE_EMPLEADO' 
    };
  }

  // Lógica del Guard CanDeactivate
  permiteSalir(): boolean {
    const hayDatosIntroducidos = 
      (this.nuevoUsuario.name?.trim() ?? '') !== '' || 
      (this.nuevoUsuario.email?.trim() ?? '') !== '' || 
      (this.nuevoUsuario.phone?.trim() ?? '') !== '' ||
      (this.nuevoUsuario.curso?.trim() ?? '') !== '';

    if (this.editando || hayDatosIntroducidos) {
      return confirm('Tienes cambios sin guardar en el formulario. ¿Deseas salir de todas formas?');
    }

    return true;
  }
}