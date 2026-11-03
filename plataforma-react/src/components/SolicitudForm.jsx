import { useState } from 'react';

const formularioInicial = {
  estudiante: '',
  tipo: '',
  descripcion: '',
};

function SolicitudForm({ onAgregar }) {
  const [formulario, setFormulario] = useState(formularioInicial);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: value,
    }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    onAgregar({
      id: crypto.randomUUID(),
      estudiante: formulario.estudiante.trim(),
      tipo: formulario.tipo.trim(),
      descripcion: formulario.descripcion.trim(),
      estado: 'Pendiente',
    });

    setFormulario(formularioInicial);
  }

  return (
    <form className="solicitud-formulario" onSubmit={manejarEnvio}>
      <div className="campo campo--completo">
        <label htmlFor="estudiante">Nombre del estudiante</label>
        <input
          id="estudiante"
          name="estudiante"
          value={formulario.estudiante}
          onChange={manejarCambio}
          minLength="3"
          required
        />
      </div>

      <div className="campo campo--completo">
        <label htmlFor="tipo">Tipo de solicitud</label>
        <select
          id="tipo"
          name="tipo"
          value={formulario.tipo}
          onChange={manejarCambio}
          required
        >
          <option value="">Selecciona una opción</option>
          <option>Constancia de estudios</option>
          <option>Cambio de horario</option>
          <option>Convalidación de curso</option>
          <option>Otro trámite académico</option>
        </select>
      </div>

      <div className="campo campo--completo">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          rows="4"
          minLength="10"
          required
        />
      </div>

      <button className="boton-primario" type="submit">
        Registrar solicitud
      </button>
    </form>
  );
}

export default SolicitudForm;
