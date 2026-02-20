export interface Usuario {
  id?: string;
  name: string;
  email: string;
  phone: string;
  curso?: string; 
  fecha?: string;
  rol: 'ADMIN' | 'EMPLEADO';
}