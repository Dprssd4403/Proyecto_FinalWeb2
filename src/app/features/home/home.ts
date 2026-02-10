import { Component } from '@angular/core';
import { Hero } from "../../models/hero/hero";
import { Services } from "../../models/services/services";

@Component({
  selector: 'app-home',
  imports: [Hero, Services],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
