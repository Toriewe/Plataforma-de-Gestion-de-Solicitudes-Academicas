import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Interpolacion } from './components/interpolacion/interpolacion';
import { Binding } from './components/binding/binding';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Interpolacion, Binding],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('plataforma-gestion');
}
