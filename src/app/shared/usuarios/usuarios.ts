import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Añadido para directivas básicas si usas signals en el HTML
import { FormsModule } from '@angular/forms';
import { AuthAdmin } from '../../services/auth-admin'; 
import { UsuarioServices } from '../../services/usuario-services';
import { Usuario } from '../../models/usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.html'
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioServices);
  public authService = inject(AuthAdmin); 

  listaUsuarios = signal<Usuario[]>([]);
  
  editando = false;
  idSeleccionado: number | null = null;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    phone: '',
    password: '',
    curso: '',
    fecha: '',
    rol: 'ROLE_ADMIN' 
  };

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.listaUsuarios.set(data);
      },
      error: (err) => console.error('Error al sincronizar datos:', err)
    });
  }

  guardarUsuario() {
    if (!this.nuevoUsuario.name || !this.nuevoUsuario.email) return;

    if (this.editando && this.idSeleccionado !== null) {
      this.usuarioService.putUsuario(this.idSeleccionado, this.nuevoUsuario).subscribe({
        next: () => {
          this.resetear();
          this.obtenerUsuarios();
        }
      });
    } else {
      this.usuarioService.postUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          this.resetear();
          this.obtenerUsuarios();
        }
      });
    }
  }

  seleccionarParaEditar(usuario: Usuario) {
    this.editando = true;
    this.idSeleccionado = usuario.id ?? null;
    this.nuevoUsuario = { ...usuario };
  }

  eliminarUsuario(id: number) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (id === Number(currentUser.id)) {
      alert('No puedes eliminar tu propia cuenta de administrador.');
      return;
    }

    if (confirm('¿Revocar acceso a este usuario permanentemente?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          this.obtenerUsuarios();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  resetear() {
    this.editando = false;
    this.idSeleccionado = null;
    this.nuevoUsuario = {
      name: '',
      email: '',
      phone: '',
      password: '',
      curso: '',
      fecha: '',
      rol: 'ROLE_ADMIN'
    };
  }
}