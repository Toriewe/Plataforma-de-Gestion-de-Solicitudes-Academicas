import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Datos } from '../modelos/datos';

@Injectable({
  providedIn: 'root',
})
export class Solicitud {
  private apiUrl = 'http://localhost:3000/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Metodo GET: Obtener todas las solicitudes
  obtenerDatos(): Observable<Datos[]> {
    return this.http.get<Datos[]>(this.apiUrl);
  }

  // Metodo POST Registrar una solicitud
  guardarDatos(dato: Omit<Datos, 'id'>): Observable<Datos> {
    return this.http.post<Datos>(this.apiUrl, dato);
  }

  // Metodo GET: Buscar una solicitud por ID
  obtenerPorId(id: string): Observable<Datos> {
    return this.http.get<Datos>(`${this.apiUrl}/${id}`);
  }

  // Metodo PUT: Actualizar una solicitud
  actualizarDatos(id: string, dato: Datos): Observable<Datos> {
    return this.http.put<Datos>(`${this.apiUrl}/${id}`, dato);
  }

  // Metodo PATCH: Actualizar campos específicos
  actualizarParcial(id: string, dato: Partial<Datos>): Observable<Datos> {
    return this.http.patch<Datos>(`${this.apiUrl}/${id}`, dato);
  }

  // Metodo DELETE: Eliminar una solicitud
  eliminarDatos(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

