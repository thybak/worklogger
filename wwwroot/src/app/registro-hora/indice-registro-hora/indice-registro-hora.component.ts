import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgbTimepicker, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RegistroHora, NOMBRE_ENTIDAD_REGISTRO_HORA, HoraAux } from '../../modelos/registro-hora';
import { API } from '../../utiles/api.service';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';
import { Autenticacion } from '../../utiles/auth.service';

@Component({
  selector: 'app-indice-registro-hora',
  templateUrl: './indice-registro-hora.component.html',
  styles: []
})
export class IndiceRegistroHoraComponent implements OnInit {
  readonly usuarioId = this.autenticacion.obtenerUsuarioId();
  dia: Date;
  proyectoId: number;
  proyecto: Proyecto;
  registrosHora: RegistroHora[];
  proyectosUsuario: Proyecto[];
  guardado: boolean;
  horas: number;
  fechaInicio: any;

  constructor(private api: API, private autenticacion: Autenticacion) {
    this.dia = new Date();
    this.registrosHora = [];
    this.proyectosUsuario = [];
    this.fechaInicio = { jsdate: this.dia };

  }

  ngOnInit() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', this.usuarioId.toString()]).subscribe(
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

  cargarRegistrosHora() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_REGISTRO_HORA, [this.proyectoId.toString(), this.dia.toISOString()]).subscribe(
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
    this.cargarRegistrosHora();
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
