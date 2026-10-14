import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Header } from '../../header/header';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Solicitud } from '../../../servicios/solicitud';
import { Router } from '@angular/router';
import { minLengthSinEspacios } from '../../../utilidades/validadores';
import { extraerMensajes } from '../../../utilidades/errores';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Header, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  // Errores que devuelve el backend (por ejemplo, validaciones de Mongoose)
  erroresServidor: string[] = [];
  // Se pone en true cuando el usuario presiona "Registrar", para mostrar el aviso general
  intentoEnvio = false;
  guardando = false;

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, minLengthSinEspacios(3)]),
    apellido: new FormControl('', [Validators.required, minLengthSinEspacios(3)]),
    celular: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    estado: new FormControl(true),
  });

  constructor(
    private solicitud: Solicitud,
    private router: Router,
  ) {}

  registrar() {
    this.intentoEnvio = true;
    this.erroresServidor = [];

    // Si hay errores, se marcan todos los campos para que aparezcan sus mensajes
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const nuevoDato = {
      nombre: this.formulario.value.nombre!.trim(),
      apellido: this.formulario.value.apellido!.trim(),
      estado: this.formulario.value.estado!,
      celular: this.formulario.value.celular!.trim(),
    };

    this.guardando = true;
    this.solicitud.guardarDatos(nuevoDato).subscribe({
      next: () => {
        this.router.navigate(['/solicitudes'], {
          state: { mensaje: 'Registro guardado correctamente' },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.guardando = false;
        this.erroresServidor = extraerMensajes(error);
      },
    });
  }
}
