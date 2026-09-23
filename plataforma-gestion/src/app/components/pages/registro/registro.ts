import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { FormsModule } from '@angular/forms';
import { Solicitud } from '../../../servicios/solicitud';
import { Router } from '@angular/router';

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
  estado = false;
  celular = '';

  constructor(
    private solicitud: Solicitud,
    private router: Router
  ) { }

  registrar() {

    const nuevoDato = {
      nombre: this.nombre,
      apellido: this.apellido,
      celular: this.celular,
      estado: this.estado
    };

    this.solicitud.guardarDatos(nuevoDato).subscribe({
      next: (respuesta) => {

        this.router.navigate(['/solicitudes']);
      }
    });
  }
}
