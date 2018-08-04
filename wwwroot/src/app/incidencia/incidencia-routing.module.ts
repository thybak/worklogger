import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceIncidenciaComponent } from './indice-incidencia/indice-incidencia.component';
import { Guardian } from '../utiles/auth.guard';

const appRutas : Routes = [
  { path: 'incidencia', component: IndiceIncidenciaComponent, canActivate: [ Guardian ] },
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule],
  providers: [Guardian]
})
export class IncidenciaRoutingModule { }
