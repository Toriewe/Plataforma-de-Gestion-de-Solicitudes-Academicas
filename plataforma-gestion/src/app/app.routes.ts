import { Routes } from '@angular/router';
import { Inicio } from './components/pages/inicio/inicio';
import { Solicitudes } from './components/pages/solicitudes/solicitudes';
import { Registro } from './components/pages/registro/registro';


export const routes: Routes = [
    {
        path: '', redirectTo: 'inicio', pathMatch: 'full'
    },
    
    {
        path: 'inicio',
        component: Inicio
    },
    {
        path: 'solicitudes',
        component: Solicitudes
    },
    {
        path: 'registro',
        component: Registro
    }
];