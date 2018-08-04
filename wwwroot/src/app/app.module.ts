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
import { UsuarioModule } from './usuario/usuario.module';
import { Autenticacion } from './utiles/auth.service';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { IncidenciaModule } from './incidencia/incidencia.module';

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
    UsuarioModule,
    EstadisticaModule,
    IncidenciaModule,
    NgbModule.forRoot()
  ],
  providers: [API, Autenticacion, {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
