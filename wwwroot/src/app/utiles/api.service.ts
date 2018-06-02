import { Http, HttpModule, RequestOptions, Headers, Response } from "@angular/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Autenticacion } from "./auth.service";
import { Router } from "@angular/router";

export enum EstadosHTTP {
    // Familia 200
    OK = 200,
    // Familia 400
    PeticionErronea = 400,
    NoAutorizado = 401,
    PeticionProhibida = 403,
    RecursoNoEncontrado = 404,
    // Familia 500
    ErrorInterno = 500
};

@Injectable()
export class API {
    static URL: string = environment.url;
    
    constructor(private http: Http, private autenticacion: Autenticacion, private router: Router) {}

//#region Métodos de utilidad
    /**
     * Genera el objeto de opciones de petición con la cabecera de autenticación a partir del token de usuario
     */
    private crearCabeceraAutenticacion() : RequestOptions {
        let requestOptions: RequestOptions = null;
        let token = this.autenticacion.obtenerToken();
        if (token !== null){
            let headers: Headers = new Headers({ 'Authorization': 'Bearer ' + token });
            requestOptions = new RequestOptions({ headers: headers });
        }
        return requestOptions;
    }
    /**
     * Se encarga de tratar las diferentes respuestas desde el API
     * @param respuesta 
     */
    private tratarRespuesta(respuesta: Response){
        if (respuesta === null || respuesta === undefined || respuesta.text() === "")
            return respuesta;
        
        return JSON.parse(respuesta.text());
    }
    /**
     * A partir de la respuesta errónea pasada por parámetro se realiza el tratamiento del error
     * @param error 
     */
    manejadorErrores(error: Response): ErrorObservable {
        // Quiere decir que hemos perdido la sesión con el API, por lo que cerramos sesión.
        if (error.status === EstadosHTTP.NoAutorizado){
            this.autenticacion.cerrarSesion();
        }
        let errMsg = `Error en el API [${error}]`;
        return Observable.throw(errMsg);
    }
//#endregion

//#region Métodos de acceso
    /**
     * Utiliza el método HTTP GET para obtener todos los registros por entidad
     * @param entidad 
     */
    getTodos(entidad: string): Observable<any> {
        return this.http.get(API.URL + entidad, this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta),
            error => this.manejadorErrores(error));
    }
    /**
     * Utiliza el método HTTP GET para obtener un registro por el identificador
     * @param entidad 
     * @param id 
     */
    getPorId(entidad: string, id: string): Observable<any> {
        return this.http.get(API.URL + entidad + "/" + id, this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta),
            error => this.manejadorErrores(error));
    }
    /**
     * Utiliza el método HTTP GET haciendo uso de parámetros para obtener registros
     * @param entidad 
     * @param parametros 
     */
    getPorParametros(entidad: string, parametros: string[]): Observable<any> {
        return this.http.get(API.URL + entidad + "/" + parametros.join('/'), this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta),
            error => this.manejadorErrores(error));
    }
    /**
     * Utiliza el método HTTP DELETE para borrar un registro a través de su identificador
     * @param entidad 
     * @param id 
     */
    deletePorId(entidad: string, id: string): Observable<any> {
        return this.http.delete(API.URL + entidad + "/" + id, this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta),
            error => this.manejadorErrores(error));
    }
    /**
     * Utiliza el método HTTP POST para comunicarse con el API e insertar registros
     * @param entidad 
     * @param registro 
     */
    post(entidad: string, registro: any): Observable<any> {
        return this.http.post(API.URL + entidad, registro, this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta),
            error => this.manejadorErrores(error));
    }
    /**
     * Utiliza el método HTTP PUT para comunicarse con el API y actualizar registros por identificador
     * @param entidad 
     * @param id 
     * @param registro 
     */
    put(entidad: string, id: number, registro: any): Observable<any> {
        return this.http.put(API.URL + entidad + "/" + id, registro, this.crearCabeceraAutenticacion()).map(
            respuesta => this.tratarRespuesta(respuesta), 
            error => this.manejadorErrores(error));
    }
//#endregion
}