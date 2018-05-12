import { Component, OnInit } from '@angular/core';
import { Login, NOMBRE_ENTIDAD_LOGIN } from '../../modelos/login';
import { Router } from '@angular/router';
import { API } from '../../utiles/api.service';
import { Autenticacion } from '../../utiles/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidadoresPersonalizados } from '../../utiles/validadores-personalizados';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  login: Login;
  errorLogin: boolean;
  frmLogin: FormGroup;

  constructor(private router: Router, private api: API, private autenticacion: Autenticacion, private fb: FormBuilder) { }

  get nombreUsuario(){
    return this.frmLogin.get("nombreUsuario");
  }

  get password(){
    return this.frmLogin.get("password");
  }

  ngOnInit() {
    this.login = new Login();
    this.frmLogin = this.fb.group({
      "nombreUsuario": new FormControl(this.login.nombreUsuario, [Validators.required]),
      "password": new FormControl(this.login.password, [Validators.required])
    });
  }

  onIniciarSesion() {
    this.api.post(NOMBRE_ENTIDAD_LOGIN, this.login).subscribe(respuesta => {
      this.autenticacion.iniciarSesion(respuesta.token);
      this.router.navigate(['/']);
    },
      error => {
        this.errorLogin = true;
      });
  }

}
