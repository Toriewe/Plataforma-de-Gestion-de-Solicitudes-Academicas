import { HttpErrorResponse } from '@angular/common/http';

/**
 * Convierte un error HTTP del backend en una lista de mensajes para mostrar al usuario.
 * El backend responde { mensaje, detalles: [...] } cuando falla una validación de Mongoose.
 */
export function extraerMensajes(error: HttpErrorResponse): string[] {
  if (error.status === 0) {
    return ['No se pudo conectar con el servidor. Verifica que el backend esté encendido.'];
  }

  const detalles = error.error?.detalles;
  if (Array.isArray(detalles) && detalles.length > 0) {
    return detalles;
  }

  return [error.error?.mensaje ?? 'Ocurrió un error inesperado. Inténtalo de nuevo.'];
}
