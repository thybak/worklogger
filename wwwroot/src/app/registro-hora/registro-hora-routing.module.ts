import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceRegistroHoraComponent } from './indice-registro-hora/indice-registro-hora.component';
import { Guardian } from '../utiles/auth.guard';

const appRutas : Routes = [
  { path: 'registro-hora', component: IndiceRegistroHoraComponent, canActivate: [ Guardian ] },
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule],
  providers: [Guardian]
})
export class RegistroHoraRoutingModule { }
