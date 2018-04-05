import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndiceProyectoComponent } from './indice-proyecto/indice-proyecto.component';


const appRutas : Routes = [
  { path: 'proyecto', component: IndiceProyectoComponent }
]

@NgModule({
  imports: [RouterModule.forChild(appRutas)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }
