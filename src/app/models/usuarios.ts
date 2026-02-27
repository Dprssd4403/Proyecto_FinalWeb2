export interface Usuario {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  curso: string;
  fecha: string;
  rol: 'ROLE_ADMIN' | 'ROLE_EMPLEADO';
}