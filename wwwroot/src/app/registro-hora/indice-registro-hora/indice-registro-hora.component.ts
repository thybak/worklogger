import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RegistroHora, NOMBRE_ENTIDAD_REGISTRO_HORA } from '../../modelos/registro-hora';
import { API } from '../../utiles/api.service';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';

@Component({
  selector: 'app-indice-registro-hora',
  templateUrl: './indice-registro-hora.component.html',
  styles: []
})
export class IndiceRegistroHoraComponent implements OnInit {
  dia: Date;
  proyecto: Proyecto;
  registrosHora: RegistroHora[];
  horas: number;

  constructor(private api: API) {
    this.dia = new Date();
    this.registrosHora = [];
  }

  ngOnInit() {
    this.api.getPorId(NOMBRE_ENTIDAD_PROYECTO, '2').subscribe(
      respuesta => {
        this.proyecto = respuesta as Proyecto;
      },
      error => {
        console.log("Error", error);
      }
    )
    this.api.getPorParametros(NOMBRE_ENTIDAD_REGISTRO_HORA, ['2', this.dia.toISOString()]).subscribe(
      respuesta => {
        this.registrosHora = respuesta as RegistroHora[];
        for(let registroHora of this.registrosHora){
          registroHora.fechaHora = new Date(registroHora.fechaHora);
        }
        this.calcularHoras();
      },
      error => {
        console.log("Error", error);
      }
    )
  }

  calcularHoras(){
    let limiteSuperior : number = this.registrosHora.length;
    if (limiteSuperior === 0){
      return;
    }
    if (limiteSuperior % 2 !== 0){
      limiteSuperior--;
    }
    console.log(limiteSuperior);
    let calculoHoras: number = 0;
    for(let idx = 0; idx < limiteSuperior; idx+=2){
      calculoHoras += (this.registrosHora[idx+1].fechaHora.getTime() - this.registrosHora[idx].fechaHora.getTime());
    }
    calculoHoras/= (1000*60*60);
    this.horas = calculoHoras;
  }

}
