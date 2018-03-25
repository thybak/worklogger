export interface RegistroHora {
    id: number;
    fechaHora: Date;
    tipo: number;
    proyectoId: number;
}

export const NOMBRE_ENTIDAD_REGISTRO_HORA = 'registrohora';