import { Component, OnInit } from '@angular/core';
import { Header } from '../../header/header';
import { Datos } from '../../../modelos/datos';
import { Solicitud } from '../../../servicios/solicitud';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [Header],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})

export class Solicitudes implements OnInit {
  datos: Datos[]=[];

  constructor(private solicitudDatos: Solicitud) {}

  ngOnInit(): void {
    this.solicitudDatos.obtenerDatos().subscribe(
      valores => {
        this.datos = valores;
      }
    );
  }
}
