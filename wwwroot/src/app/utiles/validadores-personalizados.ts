import { AbstractControl } from '@angular/forms';

export class ValidadoresPersonalizados {
    public static nombreUsuarioRegExp : RegExp = /^[0-9a-zA-Z\.\-]{0,20}$/;
    public static passwordRegExp : RegExp = /^[0-9a-zA-Z\.\-_]{5,20}$/;
    public static passwordRegExpMensaje: string = "Introduce una contraseña válida (mínimo 5 caracteres alfanuméricos, mayúsculas, minúsculas y signos de puntuación (- o _))";
    
    /**
     * Mira si el valor de dos controles es el mismo
     * @param nombrePrimerControl
     * @param nombreSegundoControl
     * @returns {(AC: AbstractControl) => any}
     * @constructor
     */
    static Match(nombrePrimerControl, nombreSegundoControl) {
        return (AC: AbstractControl) => {
            let valorPrimerControl = AC.get(nombrePrimerControl).value; // to get value in input tag
            let valorSegundoControl = AC.get(nombreSegundoControl).value; // to get value in input tag
            if (valorPrimerControl != valorSegundoControl) {
                AC.get(nombreSegundoControl).setErrors({ MatchFields: true });
            } else {
                return null;
            }
        };
    }
}