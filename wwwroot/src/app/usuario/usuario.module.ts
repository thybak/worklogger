import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  imports: [ CommonModule, UsuarioRoutingModule, FormsModule, ReactiveFormsModule ],
  declarations: [LoginComponent, RegistroComponent]
})
export class UsuarioModule { }
