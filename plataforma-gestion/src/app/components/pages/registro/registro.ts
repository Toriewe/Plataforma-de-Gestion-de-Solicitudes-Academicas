import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Solicitud } from '../../../servicios/solicitud';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Header, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})

export class Registro {
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    celular: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}')
    ]),
    estado: new FormControl(false)
  });

  constructor(
    private solicitud: Solicitud,
    private router: Router
  ) { }

  registrar() {

    const nuevoDato = {
      nombre: this.formulario.value.nombre!,
      apellido: this.formulario.value.apellido!,
      estado: this.formulario.value.estado!,
      celular: this.formulario.value.celular!
    };

    this.solicitud.guardarDatos(nuevoDato).subscribe({
      next: (respuesta) => {

        this.router.navigate(['/solicitudes']);
      }
    });
  }
}
