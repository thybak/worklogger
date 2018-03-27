export class RegistroHora {
    id: number;
    fechaHora: Date;
    proyectoId: number;
    hora: HoraAux;

    actualizarDateDeHoraAux(){
        this.fechaHora.setHours(this.hora.hour);
        this.fechaHora.setMinutes(this.hora.minute);
        this.fechaHora.setSeconds(this.hora.second);
    }
}

export class HoraAux {
    hour: number;
    minute: number;
    second: number;

    constructor(hora: number, minuto: number, segundo: number){
        this.hour = hora;
        this.minute = minuto;
        this.second = segundo;
    }
}

export const NOMBRE_ENTIDAD_REGISTRO_HORA = 'registrohora';