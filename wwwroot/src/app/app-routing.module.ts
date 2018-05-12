import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { Guardian } from './utiles/auth.guard';

const appRutas : Routes = [
  { path: '', component: InicioComponent, canActivate: [Guardian] },
  { path: 'inicio', component: InicioComponent, canActivate: [Guardian] }
]

@NgModule({
  imports: [RouterModule.forRoot(appRutas)],
  exports: [RouterModule],
  providers: [Guardian]
})
export class AppRoutingModule { }
