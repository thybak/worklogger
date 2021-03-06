import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroHoraComponent } from './registro-hora/registro-hora.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { FormsModule } from '@angular/forms';
import { ProyectoModule } from '../proyecto/proyecto.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    EstadisticaRoutingModule,
    ProyectoModule
  ],
  declarations: [RegistroHoraComponent]
})
export class EstadisticaModule { }
