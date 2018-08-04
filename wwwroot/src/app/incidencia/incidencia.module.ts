import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IndiceIncidenciaComponent } from './indice-incidencia/indice-incidencia.component';
import { IncidenciaRoutingModule } from './incidencia-routing.module';
import { ProyectoModule } from '../proyecto/proyecto.module';

@NgModule({
  imports: [ CommonModule, IncidenciaRoutingModule, FormsModule, NgbModule, ProyectoModule ],
  declarations: [ IndiceIncidenciaComponent ]
})
export class IncidenciaModule { }
