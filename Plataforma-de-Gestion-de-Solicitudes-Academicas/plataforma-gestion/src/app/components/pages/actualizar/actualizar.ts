import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Header } from '../../header/header';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud } from '../../../servicios/solicitud';
import { minLengthSinEspacios } from '../../../utilidades/validadores';
import { extraerMensajes } from '../../../utilidades/errores';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [Header, ReactiveFormsModule],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.scss',
})
export class Actualizar implements OnInit {
  id: string = '';
  cargando: boolean = true;
  guardando: boolean = false;
  // Se pone en true cuando el usuario presiona "Guardar cambios", para mostrar el aviso general
  intentoEnvio: boolean = false;
  // Errores que devuelve el backend (por ejemplo, validaciones de Mongoose)
  erroresServidor: string[] = [];

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, minLengthSinEspacios(3)]),
    apellido: new FormControl('', [Validators.required, minLengthSinEspacios(3)]),
    celular: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    estado: new FormControl(false),
  });

  constructor(
    private solicitud: Solicitud,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.id) {
      this.router.navigate(['/solicitudes']);
      return;
    }

    this.solicitud.obtenerPorId(this.id).subscribe({
      next: (dato) => {
        // Rellenar el formulario con los datos existentes
        this.formulario.patchValue({
          nombre: dato.nombre,
          apellido: dato.apellido,
          celular: dato.celular,
          estado: dato.estado,
        });

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el registro:', error);
        this.router.navigate(['/solicitudes']);
      },
    });
  }

  actualizar() {
    this.intentoEnvio = true;
    this.erroresServidor = [];

    if (this.cargando) {
      return;
    }

    // Si hay errores, se marcan todos los campos para que aparezcan sus mensajes
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datosActualizados = {
      nombre: this.formulario.value.nombre!.trim(),
      apellido: this.formulario.value.apellido!.trim(),
      celular: this.formulario.value.celular!.trim(),
      estado: this.formulario.value.estado!,
    };

    this.guardando = true;
    this.solicitud.actualizarDatos(this.id, datosActualizados).subscribe({
      next: () => {
        this.router.navigate(['/solicitudes'], {
          state: { mensaje: 'Registro actualizado correctamente' },
        });
      },
      error: (error: HttpErrorResponse) => {
        this.guardando = false;
        this.erroresServidor = extraerMensajes(error);
      },
    });
  }
}
