import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class Autenticacion {
    readonly TOKEN_KEY : string = "token";

    constructor(private router: Router){}

    iniciarSesion(token: string){
        sessionStorage.setItem(this.TOKEN_KEY, token);    
    }
    cerrarSesion(){
        sessionStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }
    isSesionActiva(){
        let token = this.obtenerToken();
        return token !== null && token !== '';
    }
    obtenerUsuarioId(){
        let token = this.obtenerToken();
        let usuarioId = -1;
        if (token !== null && token !== ''){
            var split = token.split('.');
            var payLoad = JSON.parse(atob(split[1]));
            usuarioId = parseInt(payLoad.sub);
        }
        return usuarioId;
    }
    obtenerToken(){
        return sessionStorage.getItem(this.TOKEN_KEY);
    }
}