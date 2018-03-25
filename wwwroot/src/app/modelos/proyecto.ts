export interface Proyecto {
    id: number;
    nombre: string;
    tipo: number;
    usuarioId: number;
}

export const NOMBRE_ENTIDAD_PROYECTO = 'proyecto';