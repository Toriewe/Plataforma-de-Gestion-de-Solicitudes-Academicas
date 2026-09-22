import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Datos } from '../modelos/datos';

@Injectable({
  providedIn: 'root',
})
export class Solicitud {
  private apiUrl = 'http://localhost:3000/datos';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<Datos[]> {
    return this.http.get<Datos[]>(this.apiUrl);
  }
}
