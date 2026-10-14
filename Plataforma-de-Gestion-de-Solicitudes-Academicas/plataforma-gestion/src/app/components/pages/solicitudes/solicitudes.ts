import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Header } from '../../header/header';
import { Datos } from '../../../modelos/datos';
import { Solicitud } from '../../../servicios/solicitud';
import { Router, RouterLink } from '@angular/router';
import { extraerMensajes } from '../../../utilidades/errores';

type TipoAlerta = 'exito' | 'error' | 'info';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [Header, RouterLink],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})
export class Solicitudes implements OnInit, OnDestroy {
  datos: Datos[] = [];
  alerta: { tipo: TipoAlerta; texto: string } | null = null;

  private temporizadorAlerta?: ReturnType<typeof setTimeout>;

  constructor(
    private solicitudDatos: Solicitud,
    private router: Router,
  ) {
    // Mensaje enviado desde registro / actualizar (ej. "Registro guardado correctamente")
    const mensaje = this.router.getCurrentNavigation()?.extras.state?.['mensaje'];
    if (mensaje) {
      this.mostrarAlerta('exito', mensaje);
    }
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  ngOnDestroy(): void {
    clearTimeout(this.temporizadorAlerta);
  }

  // GET: Cargar registros
  obtenerSolicitudes() {
    this.solicitudDatos.obtenerDatos().subscribe({
      next: (valores) => {
        this.datos = valores;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener solicitudes:', error);
        this.mostrarAlerta('error', extraerMensajes(error).join(' '));
      },
    });
  }

  // DELETE (eliminación lógica): pone estado = false
  desactivar(id: string) {
    this.solicitudDatos.eliminarDatos(id).subscribe({
      next: () => {
        this.mostrarAlerta('info', 'Registro eliminado');
        this.obtenerSolicitudes();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al desactivar registro:', error);
        this.mostrarAlerta('error', extraerMensajes(error).join(' '));
      },
    });
  }

  // PATCH: vuelve a poner estado = true
  reactivar(id: string) {
    this.solicitudDatos.actualizarParcial(id, { estado: true }).subscribe({
      next: () => {
        this.mostrarAlerta('exito', 'Registro reactivado');
        this.obtenerSolicitudes();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al reactivar registro:', error);
        this.mostrarAlerta('error', extraerMensajes(error).join(' '));
      },
    });
  }

  cerrarAlerta() {
    clearTimeout(this.temporizadorAlerta);
    this.alerta = null;
  }

  private mostrarAlerta(tipo: TipoAlerta, texto: string) {
    clearTimeout(this.temporizadorAlerta);
    this.alerta = { tipo, texto };
    this.temporizadorAlerta = setTimeout(() => (this.alerta = null), 4000);
  }
}
