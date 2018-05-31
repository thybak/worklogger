import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class UtilesFechas {
    
    static ObtenerDateDeNgbDateStruct(ngbDateStruct: NgbDateStruct){
        let fecha = new Date();
        fecha.setDate(ngbDateStruct.day);
        fecha.setMonth(ngbDateStruct.month-1);
        fecha.setFullYear(ngbDateStruct.year);
        return fecha;
    }

    static EstablecerHoraActualAFecha(fecha: Date){
        let fechaActual: Date = new Date();
        fecha.setHours(fechaActual.getHours(), fechaActual.getMinutes(), fechaActual.getSeconds());
        return fecha;
    }

    static ObtenerNgbDateStructDeDate(date: Date){
        let ngbDateStruct: NgbDateStruct;
        ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
        return ngbDateStruct;
    }

    static ObtenerDateStringDeNgbDateStruct(ngbDateStruct: NgbDateStruct): string {
        return `${ngbDateStruct.year}-${ngbDateStruct.month}-${ngbDateStruct.day}`;
    }
}