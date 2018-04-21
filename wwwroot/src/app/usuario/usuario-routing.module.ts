import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const appRutas : Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRutas)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class UsuarioRoutingModule { }
