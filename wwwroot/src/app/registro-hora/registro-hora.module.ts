import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IndiceRegistroHoraComponent } from './indice-registro-hora/indice-registro-hora.component';
import { RegistroHoraRoutingModule } from './registro-hora-routing.module';
import { ProyectoModule } from '../proyecto/proyecto.module';

@NgModule({
  imports: [ CommonModule, RegistroHoraRoutingModule, FormsModule, NgbModule, ProyectoModule ],
  declarations: [ IndiceRegistroHoraComponent ]
})
export class RegistroHoraModule { }
