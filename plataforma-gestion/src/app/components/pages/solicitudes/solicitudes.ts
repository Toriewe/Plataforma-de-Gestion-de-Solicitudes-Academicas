import { Component, OnInit } from '@angular/core';
import { Header } from '../../header/header';
import { Datos } from '../../../modelos/datos';
import { Solicitud } from '../../../servicios/solicitud';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [Header, RouterLink],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})

export class Solicitudes implements OnInit {
  datos: Datos[]=[];

  constructor(private solicitudDatos: Solicitud) {}

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  // GET: Cargar registros
  obtenerSolicitudes() {
    this.solicitudDatos.obtenerDatos().subscribe({
      next: (valores) => {
        this.datos = valores;
      },
      error: (error) => {
        console.error('Error al obtener solicitudes:', error);
      }
    });
  }

  // DELETE: Desactivar registro
  desactivar(id: string) {
    this.solicitudDatos.eliminarDatos(id).subscribe({
      next: () => {
        this.obtenerSolicitudes();
      },
      error: (error) => {
        console.error('Error al desactivar registro:', error);
      }
    });
  }

}
