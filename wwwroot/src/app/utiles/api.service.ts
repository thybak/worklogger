import { Http, HttpModule, RequestOptions, Headers } from "@angular/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

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
    
    constructor(private http: Http) {}

//#region Métodos de utilidad
    /**
     * A partir de la respuesta errónea pasada por parámetro se realiza el tratamiento del error
     * @param error 
     */
    private manejadorErrores(error: Response): ErrorObservable {
        let errMsg = `Error en el API [${error}]`;
        return Observable.throw(errMsg);
    }
    /**
     * Genera el objeto de opciones de petición con la cabecera de autenticación a partir del token de usuario
     */
    private crearCabeceraAutenticacion() : RequestOptions {
        let requestOptions: RequestOptions = null;
        let token = sessionStorage.getItem('tokenUsuario');
        if (token != undefined){
            let headers: Headers = new Headers({ 'Authorization': 'Bearer ' + token });
            requestOptions = new RequestOptions({ headers: headers });
        }
        return requestOptions;
    }
//#endregion

//#region Métodos de acceso
    /**
     * Utiliza el método HTTP GET para obtener todos los registros por entidad
     * @param entidad 
     */
    getTodos(entidad: string): Observable<any> {
        return this.http.get(API.URL + entidad, this.crearCabeceraAutenticacion()).map(respuesta => JSON.parse(respuesta.text()));
    }
    /**
     * Utiliza el método HTTP GET para obtener un registro por el identificador
     * @param entidad 
     * @param id 
     */
    getPorId(entidad: string, id: string): Observable<any> {
        return this.http.get(API.URL + entidad + "/" + id, this.crearCabeceraAutenticacion()).map(respuesta => JSON.parse(respuesta.text()));
    }
    /**
     * Utiliza el método HTTP GET haciendo uso de parámetros para obtener registros
     * @param entidad 
     * @param parametros 
     */
    getPorParametros(entidad: string, parametros: string[]): Observable<any> {
        return this.http.get(API.URL + entidad + "/" + parametros.join('/')).map(respuesta => JSON.parse(respuesta.text()));
    }
    /**
     * Utiliza el método HTTP DELETE para borrar un registro a través de su identificador
     * @param entidad 
     * @param id 
     */
    deletePorId(entidad: string, id: string): Observable<any> {
        return this.http.delete(API.URL + entidad + "/" + id, this.crearCabeceraAutenticacion()).map(respuesta => respuesta);
    }
    /**
     * Utiliza el método HTTP POST para comunicarse con el API e insertar registros
     * @param entidad 
     * @param registro 
     */
    post(entidad: string, registro: any): Observable<any> {
        return this.http.post(API.URL + entidad, registro, this.crearCabeceraAutenticacion()).map(respuesta => JSON.parse(respuesta.text()));
    }
    /**
     * Utiliza el método HTTP PUT para comunicarse con el API y actualizar registros por identificador
     * @param entidad 
     * @param id 
     * @param registro 
     */
    put(entidad: string, id: number, registro: any): Observable<any> {
        return this.http.put(API.URL + entidad + "/" + id, registro, this.crearCabeceraAutenticacion()).map(respuesta => JSON.parse(respuesta.text()));
    }
//#endregion
}