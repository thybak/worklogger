import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiceProyectoComponent } from './indice-proyecto/indice-proyecto.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { FormsModule } from '@angular/forms';
import { SeleccionProyectoComponent } from './seleccion-proyecto/seleccion-proyecto.component';

@NgModule({
  imports: [CommonModule, ProyectoRoutingModule, FormsModule],
  declarations: [IndiceProyectoComponent, SeleccionProyectoComponent],
  exports: [SeleccionProyectoComponent]
})
export class ProyectoModule { }
