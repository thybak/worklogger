export class EstadisticaRegistros {
    totalHoras: number;
    registrosDia: RegistroDia[];
}

export class RegistroDia {
    horas: number;
    dia: Date;
}

export const NOMBRE_ENTIDAD_ESTADISTICA = "estadistica";