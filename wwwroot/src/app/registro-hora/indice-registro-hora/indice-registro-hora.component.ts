import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { RegistroHora, NOMBRE_ENTIDAD_REGISTRO_HORA, HoraAux } from '../../modelos/registro-hora';
import { API } from '../../utiles/api.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';

@Component({
  selector: 'app-indice-registro-hora',
  templateUrl: './indice-registro-hora.component.html',
  styles: []
})
export class IndiceRegistroHoraComponent implements OnInit {
  dia: Date;
  proyectoId: number;
  proyecto: Proyecto;
  registrosHora: RegistroHora[];
  proyectosUsuario: Proyecto[];
  editable: boolean;
  horas: number;
  opcionesFecha: IMyDpOptions;
  fechaInicio: any;

  constructor(private api: API) {
    this.dia = new Date();
    this.registrosHora = [];
    this.proyectosUsuario = [];
    this.fechaInicio = { jsdate: this.dia };
    this.opcionesFecha = {
      dateFormat: 'dd mmm yyyy'
    };

  }

  ngOnInit() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', '7']).subscribe(
      respuesta => {
        this.proyectosUsuario = respuesta as Proyecto[];
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  calcularHoras() {
    let limiteSuperior: number = this.registrosHora.length;
    if (limiteSuperior === 0) {
      this.horas = 0;
      return;
    }
    if (limiteSuperior % 2 !== 0) {
      limiteSuperior--;
    }
    let calculoHoras: number = 0;
    for (let idx = 0; idx < limiteSuperior; idx += 2) {
      calculoHoras += (this.registrosHora[idx + 1].fechaHora.getTime() - this.registrosHora[idx].fechaHora.getTime());
    }
    calculoHoras /= (1000 * 60 * 60);
    this.horas = calculoHoras;
  }

  cargarProyecto() {
    this.api.getPorId(NOMBRE_ENTIDAD_PROYECTO, this.proyectoId.toString()).subscribe(
      respuesta => {
        this.proyecto = respuesta as Proyecto;
        this.cargarRegistrosHora();
      });
  }

  cargarRegistrosHora(){
    this.api.getPorParametros(NOMBRE_ENTIDAD_REGISTRO_HORA, [this.proyectoId.toString(), this.dia.toISOString()]).subscribe(
      respuesta => {
        this.registrosHora = respuesta as RegistroHora[];
        for (let registroHora of this.registrosHora) {
          registroHora.fechaHora = new Date(registroHora.fechaHora);
          registroHora.hora = new HoraAux(registroHora.fechaHora.getHours(), registroHora.fechaHora.getMinutes(), registroHora.fechaHora.getSeconds());
        }
        this.calcularHoras();
      },
      error => {
        console.log("Error", error);
      });
  }

  altaRapida() {
    let registroHora: RegistroHora = new RegistroHora();
    registroHora.proyectoId = this.proyecto.id;
    this.api.post(NOMBRE_ENTIDAD_REGISTRO_HORA, registroHora).subscribe(
      respuesta => {
        registroHora.id = respuesta.id;
        registroHora.fechaHora = new Date(respuesta.fechaHora);
        this.registrosHora.push(registroHora);
        this.calcularHoras();
      });
  }

  eliminarRegistro(id: number) {
    this.api.deletePorId(NOMBRE_ENTIDAD_REGISTRO_HORA, id.toString()).subscribe(
      () => {
        this.registrosHora.splice(this.registrosHora.findIndex(r => r.id == id), 1);
        this.calcularHoras();
      });
  }

  onFechaCambiada(evento: IMyDateModel) {
    this.dia = evento.jsdate;
    this.cargarRegistrosHora();
  }

  guardar(){
    for(let registroHora of this.registrosHora){
      let registroHoraF : RegistroHora = new RegistroHora();
      Object.assign(registroHoraF, registroHora);
      registroHoraF.actualizarDateDeHoraAux();
      this.api.put(NOMBRE_ENTIDAD_REGISTRO_HORA, registroHoraF.id, registroHoraF).subscribe();
    }
    
  }
}
