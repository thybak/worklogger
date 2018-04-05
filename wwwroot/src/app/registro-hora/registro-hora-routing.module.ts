import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceRegistroHoraComponent } from './indice-registro-hora/indice-registro-hora.component';

const appRutas : Routes = [
  { path: 'registro-hora', component: IndiceRegistroHoraComponent },
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule]
})
export class RegistroHoraRoutingModule { }
