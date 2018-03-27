import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { DetalleRegistroHoraComponent } from './detalle-registro-hora/detalle-registro-hora.component';
import { IndiceRegistroHoraComponent } from './indice-registro-hora/indice-registro-hora.component';
import { RegistroHoraRoutingModule } from './registro-hora-routing.module';

@NgModule({
  imports: [ CommonModule, RegistroHoraRoutingModule, FormsModule, NgbModule, MyDatePickerModule ],
  declarations: [ DetalleRegistroHoraComponent, IndiceRegistroHoraComponent ]
})
export class RegistroHoraModule { }
