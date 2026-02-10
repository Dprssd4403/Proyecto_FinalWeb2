import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  @Input() titulo!: string;
  @Input() subtitulo!: string;
  @Input() descripcion!: string;
  @Input() imagen!: string;
  @Input() button!: string;
  @Input({ required: true }) mostrarBoton!: boolean;
  @Input() colorFondo!: string;
}
