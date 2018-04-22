import { Component, OnInit } from '@angular/core';
import { Usuario, NOMBRE_ENTIDAD_USUARIO } from '../../modelos/usuario';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidadoresPersonalizados } from '../../utiles/validadores-personalizados';
import { API } from '../../utiles/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  usuario: Usuario;
  confirmarPassword: string;
  frmUsuario: FormGroup;
  usuarioCreado: boolean = false;

  get nombreUsuario() {
    return this.frmUsuario.get('nombreUsuario');
  }
  get correo() {
    return this.frmUsuario.get('correo');
  }
  get password() {
    return this.frmUsuario.get('password');
  }
  get fieldConfirmarPassword() {
    return this.frmUsuario.get('confirmarPassword');
  }

  constructor(private router: Router, private fb: FormBuilder, private api: API) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.frmUsuario = this.fb.group({
      "nombreUsuario": new FormControl(this.usuario.nombreUsuario, [Validators.pattern(ValidadoresPersonalizados.nombreUsuarioRegExp), Validators.required]),
      "correo": new FormControl(this.usuario.correo, [Validators.email]),
      "password": new FormControl(this.usuario.password, [Validators.pattern(ValidadoresPersonalizados.passwordRegExp), Validators.required]),
      "confirmarPassword": new FormControl(this.confirmarPassword, [Validators.required])
    },
    {
      validator: ValidadoresPersonalizados.Match("password", "confirmarPassword")
    });
  }

  registrarUsuario(){
    this.api.post(NOMBRE_ENTIDAD_USUARIO, this.usuario).subscribe(
      respuesta => {
        this.usuarioCreado = true;
      },
      error => {
        console.log(error);
      }
    );
  }

}
