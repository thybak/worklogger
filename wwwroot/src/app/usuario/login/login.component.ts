import { Component, OnInit } from '@angular/core';
import { Login, NOMBRE_ENTIDAD_LOGIN } from '../../modelos/login';
import { Router } from '@angular/router';
import { API } from '../../utiles/api.service';
import { Autenticacion } from '../../utiles/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  login: Login;

  constructor(private router: Router, private api: API, private autenticacion: Autenticacion) {}

  ngOnInit() {
    this.login = new Login();
  }

  onIniciarSesion() {
    this.api.post(NOMBRE_ENTIDAD_LOGIN, this.login).subscribe(respuesta => {
      this.autenticacion.iniciarSesion(respuesta.token);
      this.router.navigate(['/inicio']);
    },
      error => {
        console.log(error);
      });
  }

}
