import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Interpolacion } from './components/interpolacion/interpolacion';
import { Binding } from './components/binding/binding';
import { PgControlFlow } from './components/pg-control-flow/pg-control-flow';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Interpolacion, Binding, PgControlFlow],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('plataforma-gestion');
}
