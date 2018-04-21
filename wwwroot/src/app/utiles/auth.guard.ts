import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Autenticacion } from "./auth.service";

@Injectable()
export class Guardian implements CanActivate {

    constructor(
        private router: Router,
        private autenticacion: Autenticacion
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.autenticacion.isSesionActiva()){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}