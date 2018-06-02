import { Component, OnInit } from '@angular/core';
import { API } from '../../utiles/api.service';
import { Autenticacion } from '../../utiles/auth.service';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { UtilesFechas } from '../../utiles/fechas';
import { NOMBRE_ENTIDAD_ESTADISTICA, EstadisticaRegistros } from '../../modelos/estadistica';

@Component({
  selector: 'app-registro-hora',
  templateUrl: './registro-hora.component.html',
  styles: []
})
export class RegistroHoraComponent implements OnInit {
  readonly usuarioId = this.autenticacion.obtenerUsuarioId();
  fechaInicio: string;
  dpFechaInicio: NgbDateStruct;
  fechaFin: string;
  dpFechaFin: NgbDateStruct;
  proyectoId: number;
  resultados: any[];
  proyectosUsuario: Proyecto[];
  estadistica: EstadisticaRegistros;

  // Configuración de componente estadísticas
  view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Día';
  showYAxisLabel = true;
  yAxisLabel = 'Horas';
  colorScheme = {
    domain: ['#606470', '#93deff']
  };

  get criterioEstablecido(): boolean {
    return this.fechaInicio !== undefined && this.fechaFin !== undefined && this.proyectoId > 0;
  }

  constructor(private api: API, private autenticacion: Autenticacion) { }

  ngOnInit() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', this.usuarioId.toString()]).subscribe(respuesta => {
      this.proyectosUsuario = respuesta as Proyecto[];
      if (this.proyectosUsuario.length > 0) {
        this.proyectoId = this.proyectosUsuario[0].id;
      }
    });
  }

  onFechaCambiada(id: any) {
    if (id === "dpFechaInicio") {
      this.fechaInicio = UtilesFechas.ObtenerDateStringDeNgbDateStruct(this.dpFechaInicio);
    } else if (id === "dpFechaFin") {
      this.fechaFin = UtilesFechas.ObtenerDateStringDeNgbDateStruct(this.dpFechaFin);
    }
  }

  generarEstadisticas() {
    this.api.getPorParametros
      (NOMBRE_ENTIDAD_ESTADISTICA,
      ['proyecto', this.proyectoId.toString(), this.fechaInicio, this.fechaFin]).subscribe(
        respuesta => {
          this.estadistica = respuesta as EstadisticaRegistros;
          this.resultados = [];
          for (let registroDia of this.estadistica.registrosDia){
            this.resultados.push({ "name": registroDia.dia, "value": registroDia.horas });
          }
          Object.assign(this, this.resultados);
        });
  }

}
