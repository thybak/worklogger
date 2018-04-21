import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndiceProyectoComponent } from './indice-proyecto/indice-proyecto.component';
import { Guardian } from '../utiles/auth.guard';


const appRutas : Routes = [
  { path: 'proyecto', component: IndiceProyectoComponent, canActivate: [Guardian] }
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule],
  providers: [Guardian]
})
export class ProyectoRoutingModule { }
