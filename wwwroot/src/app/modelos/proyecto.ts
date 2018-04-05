export class Proyecto {
    id: number;
    nombre: string;
    tipo: number;
    usuarioId: number;
    get tipoString(): string {
        switch (this.tipo){
            case ProyectoTipo.Ocio:
                return "Ocio";
            case ProyectoTipo.Laboral:
                return "Laboral";
            default:
                return "Ninguno";
        }
    }
}

export enum ProyectoTipo {
    Ninguno = 0,
    Ocio = 1,
    Laboral = 2
}

export const NOMBRE_ENTIDAD_PROYECTO = 'proyecto';