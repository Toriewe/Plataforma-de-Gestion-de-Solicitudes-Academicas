import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binding',
  imports: [FormsModule],
  templateUrl: './binding.html',
})
export class Binding {
  productoNom = '';
  seleccion =  true;

  seleccionar(): void{
    this.seleccion = true;
  }
}
