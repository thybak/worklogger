import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistroHoraComponent } from './registro-hora/registro-hora.component';
import { Autenticacion } from '../utiles/auth.service';
import { Guardian } from '../utiles/auth.guard';

const appRutas : Routes = [
  { path: 'estadistica', component: RegistroHoraComponent, canActivate: [Guardian] }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRutas)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class EstadisticaRoutingModule { }
