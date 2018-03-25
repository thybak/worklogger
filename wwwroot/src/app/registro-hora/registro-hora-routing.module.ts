import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleRegistroHoraComponent } from './detalle-registro-hora/detalle-registro-hora.component';
import { IndiceRegistroHoraComponent } from './indice-registro-hora/indice-registro-hora.component';

const appRutas : Routes = [
  { path: 'registro-hora', component: IndiceRegistroHoraComponent },
  { path: 'registro-hora/:id', component: DetalleRegistroHoraComponent }
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule]
})
export class RegistroHoraRoutingModule { }
