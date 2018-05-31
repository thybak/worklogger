import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgbTimepicker, NgbAlert, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroHora, NOMBRE_ENTIDAD_REGISTRO_HORA, HoraAux } from '../../modelos/registro-hora';
import { API } from '../../utiles/api.service';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';
import { Autenticacion } from '../../utiles/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { UtilesFechas } from '../../utiles/fechas';

@Component({
  selector: 'app-indice-registro-hora',
  templateUrl: './indice-registro-hora.component.html',
  styles: []
})
export class IndiceRegistroHoraComponent implements OnInit {
  readonly usuarioId = this.autenticacion.obtenerUsuarioId();
  dia: NgbDateStruct;
  proyectoId: number;
  proyecto: Proyecto;
  registrosHora: RegistroHora[];
  proyectosUsuario: Proyecto[];
  guardado: boolean;
  horas: number;
  fechaHoy: any;

  constructor(private api: API, private autenticacion: Autenticacion, private modalService: NgbModal) {
    this.registrosHora = [];
    this.proyectosUsuario = [];
  }

  ngOnInit() {
    this.fechaHoy = new Date();
    this.dia = UtilesFechas.ObtenerNgbDateStructDeDate(this.fechaHoy);
    this.cargarProyectos();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }

  cargarProyectos(){
    this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', this.usuarioId.toString()]).subscribe(
      respuesta => {
        this.proyectosUsuario = respuesta as Proyecto[];
        // Seleccionamos el primero de la lista.
        if (this.proyectosUsuario.length > 0){
          this.proyectoId = this.proyectosUsuario[0].id;
          this.cargarProyecto();
        }
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

  cargarRegistrosHora() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_REGISTRO_HORA, [this.proyectoId.toString(), this.fechaHoy.toISOString()]).subscribe(
      respuesta => {
        this.registrosHora = respuesta as RegistroHora[];
        for (let registroHora of this.registrosHora) {
          let registroHoraF : RegistroHora = new RegistroHora();
          Object.assign(registroHoraF, registroHora);
          registroHoraF.fechaHora = new Date(registroHora.fechaHora);
          registroHoraF.asignarHoraAuxDeDate();
          Object.assign(registroHora, registroHoraF);
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
    registroHora.fechaHora = UtilesFechas.EstablecerHoraActualAFecha(this.fechaHoy);
    this.api.post(NOMBRE_ENTIDAD_REGISTRO_HORA, registroHora).subscribe(
      respuesta => {
        registroHora.id = respuesta.id;
        registroHora.fechaHora = new Date(respuesta.fechaHora);
        registroHora.asignarHoraAuxDeDate();
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

  onFechaCambiada() {
    if (this.proyectoId !== undefined) {
      this.fechaHoy = UtilesFechas.ObtenerDateDeNgbDateStruct(this.dia);
      this.cargarRegistrosHora();
    }
  }

  mostrarAlertaDeGuardado(numRegistros) {
      this.guardado = true;
      setTimeout(() => this.guardado = false, 5000);
  }

  guardar() {
    let numRegistros = this.registrosHora.length;
    for (let registroHora of this.registrosHora) {
      let registroHoraF: RegistroHora = new RegistroHora();
      Object.assign(registroHoraF, registroHora); // necesario para tener acceso a métodos de los objetos
      registroHoraF.actualizarDateDeHoraAux();
      this.api.put(NOMBRE_ENTIDAD_REGISTRO_HORA, registroHoraF.id, registroHoraF).subscribe(respuesta => {
        numRegistros--;
        if (numRegistros == 0) {
            this.mostrarAlertaDeGuardado(numRegistros);
            this.calcularHoras();
        }
      });
    }
  }
}
