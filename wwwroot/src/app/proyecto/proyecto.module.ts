import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiceProyectoComponent } from './indice-proyecto/indice-proyecto.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ProyectoRoutingModule, FormsModule],
  declarations: [IndiceProyectoComponent]
})
export class ProyectoModule { }
