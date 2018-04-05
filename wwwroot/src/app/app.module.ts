import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroHoraModule } from './registro-hora/registro-hora.module';
import { HttpModule } from '@angular/http';
import { API } from './utiles/api.service';
import { ProyectoModule } from './proyecto/proyecto.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    InicioComponent
  ],
  imports: [
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    RegistroHoraModule,
    ProyectoModule,
    NgbModule.forRoot()
  ],
  providers: [API, {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
