import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Header, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {

}
