import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Header, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  nombre = '';
  apellido = '';
  correo = '';
  celular = '';
}
