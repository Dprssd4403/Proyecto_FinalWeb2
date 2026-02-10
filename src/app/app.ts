import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavBar } from "./models/nav-bar/nav-bar";
import { Footer } from "./models/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
    ngOnInit(): void {
      initFlowbite();
    }
}
