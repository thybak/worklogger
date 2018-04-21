import { Component, OnInit } from '@angular/core';
import { Autenticacion } from '../utiles/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {
  get autenticado(): boolean{
    return this.autenticacion.isSesionActiva();
  }

  constructor(private autenticacion: Autenticacion) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.autenticacion.cerrarSesion();
  }
}
