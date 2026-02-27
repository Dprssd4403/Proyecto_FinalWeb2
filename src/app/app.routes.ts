import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Registro } from './features/registro/registro';
import { Contacto } from './features/contacto/contacto';
import { Nosotros } from './features/nosotros/nosotros';
import { Cursos } from './shared/cursos/cursos';
import { CatalogoCursos } from './features/catalogo-cursos/catalogo-cursos';
import { Login } from './shared/login/login';
import { Usuarios } from './shared/usuarios/usuarios'; 

// Guardianes
import { authGuard } from './guards/auth-guard';
import { authGuardDeactivate } from './guards/deactive-guard';
import { adminGuard } from './guards/match-guard';
import { adminChildGuard } from './guards/active-child-guard';
import { Error } from './shared/error/error';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'nosotros', component: Nosotros },
    { path: 'contacto', component: Contacto },
    { path: 'catalogo', component: CatalogoCursos },
    { path: 'login', component: Login },
    { path: 'error', component: Error },
    { 
        path: 'registro', 
        component: Registro,
        canActivate: [authGuard],
        canDeactivate: [authGuardDeactivate]
    },
    {
        path: 'admin',
        canActivateChild: [adminChildGuard],
        children: [
            {
                path: 'cursos',
                component: Cursos,
                canMatch: [adminGuard]
            },
            {
                path: 'usuarios', // Nueva ruta para gestionar usuarios
                component: Usuarios,
                canMatch: [adminGuard]
            }
        ]
    },
    { path: '**', redirectTo: '/error' }
];