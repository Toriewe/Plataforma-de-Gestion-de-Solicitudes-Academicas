import { Component } from '@angular/core';
import { Producto } from '../../modelos/productos';

@Component({
  selector: 'app-pg-control-flow',
  imports: [],
  templateUrl: './pg-control-flow.html',
})
export class PgControlFlow {
  productos: Producto[]=[
    {id: 1, nombre: 'Producto 1', precio: 10.10, activo: true, stock: 5},
    {id: 2, nombre: 'Producto 2', precio: 5.50, activo: false, stock: 20},
    {id: 3, nombre: 'Producto 3', precio: 3.80, activo: true, stock: 67},
    {id: 4, nombre: 'Producto 4', precio: 20, activo: true, stock: 7},
    {id: 5, nombre: 'Producto 5', precio: 100.99, activo: false, stock: 15},
  ]
}
