import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Igual que Validators.minLength, pero ignora los espacios al inicio y al final.
 * Así "  a " no cuenta como válido (el backend también hace trim).
 * Si el campo está vacío no devuelve error: de eso se encarga Validators.required.
 */
export function minLengthSinEspacios(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value ?? '').toString();
    if (valor.length === 0) {
      return null;
    }
    const largo = valor.trim().length;
    return largo < min
      ? { minlength: { requiredLength: min, actualLength: largo } }
      : null;
  };
}
