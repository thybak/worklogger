import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const appRutas : Routes = [
  { path: 'inicio', component: InicioComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
