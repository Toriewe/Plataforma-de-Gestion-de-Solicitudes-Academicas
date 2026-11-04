
import { createSlice } from '@reduxjs/toolkit';

const filtroSlice = createSlice({
  name: 'filtro',

  initialState: {
    estadoSeleccionado: 'Todas',
  },

  reducers: {
    cambiarFiltro: (state, action) => {
      state.estadoSeleccionado = action.payload;
    },

    restablecerFiltro: (state) => {
      state.estadoSeleccionado = 'Todas';
    },
  },
});

export const {
  cambiarFiltro,
  restablecerFiltro,
} = filtroSlice.actions;

export default filtroSlice.reducer;
