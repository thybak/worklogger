import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class UtilesFechas {
    
    static ObtenerDateDeNgbDateStruct(ngbDateStruct: NgbDateStruct){
        let date = new Date();
        date.setDate(ngbDateStruct.day);
        date.setMonth(ngbDateStruct.month-1);
        date.setFullYear(ngbDateStruct.year);
        return date;
    }

    static ObtenerNgbDateStructDeDate(date: Date){
        let ngbDateStruct: NgbDateStruct;
        ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
        return ngbDateStruct;
    }
}