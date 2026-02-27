import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario, UsuarioServices } from '../../services/usuario.service'; 
import { AuthAdmin } from '../../services/auth-admin'; 

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios.component.html'
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioServices);
  public authService = inject(AuthAdmin); 

  listaUsuarios = signal<Usuario[]>([]);
  
  editando = false;
  idSeleccionado: string | null = null;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rol: 'EMPLEADO' 
  };

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.listaUsuarios.set(data);
      },
      error: (err) => console.error('Error al sincronizar datos:', err)
    });
  }

  guardarUsuario() {
    if (!this.nuevoUsuario.name || !this.nuevoUsuario.email) return;

    if (this.editando && this.idSeleccionado) {
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
    this.idSeleccionado = usuario.id || null;
    this.nuevoUsuario = { ...usuario };
  }

  eliminarUsuario(id: string) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (id === currentUser.id) {
      alert('No puedes eliminar tu propia cuenta de administrador.');
      return;
    }

    if (confirm('¿Revocar acceso a este usuario permanentemente?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.obtenerUsuarios();
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
      rol: 'EMPLEADO'
    };
  }
}