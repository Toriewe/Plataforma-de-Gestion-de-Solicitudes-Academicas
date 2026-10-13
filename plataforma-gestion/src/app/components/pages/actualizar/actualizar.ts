import { Component, OnInit } from '@angular/core';
import { Header } from '../../header/header';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Solicitud } from '../../../servicios/solicitud';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [Header],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.scss',
})
export class Actualizar implements OnInit {
  id: string = '';
  cargando: boolean = true;

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
    private route: ActivatedRoute,
    private router: Router
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
          estado: dato.estado
        });

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar el registro:', error);
        this.router.navigate(['/solicitudes']);
      }
    });
  }

  actualizar() {
    if (this.formulario.invalid || this.cargando) {
      return;
    }

    const datosActualizados = {
      nombre: this.formulario.value.nombre!,
      apellido: this.formulario.value.apellido!,
      celular: this.formulario.value.celular!,
      estado: this.formulario.value.estado!
    };

    this.solicitud.actualizarDatos(
      this.id,
      datosActualizados
    ).subscribe({
      next: (respuesta) => {
        console.log('Registro actualizado:', respuesta);
        this.router.navigate(['/solicitudes']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
      }
    });
  }
}
