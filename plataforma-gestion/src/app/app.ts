import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Interpolacion } from './components/interpolacion/interpolacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Interpolacion],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('plataforma-gestion');
}
