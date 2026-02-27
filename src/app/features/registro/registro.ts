import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { Formulario } from '../formulario/formulario';
import { Soporte } from "../../shared/soporte/soporte";
import { Features } from "../../shared/features/features";

@Component({
  selector: 'app-registro',
  imports: [Formulario, Soporte],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

}
