import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Incidencia, NOMBRE_ENTIDAD_INCIDENCIA } from '../../modelos/incidencia';
import { API } from '../../utiles/api.service';
import { Proyecto, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';
import { Autenticacion } from '../../utiles/auth.service';

@Component({
  selector: 'app-indice-incidencia',
  templateUrl: './indice-incidencia.component.html',
  styles: []
})
export class IndiceIncidenciaComponent implements OnInit {
  readonly usuarioId = this.autenticacion.obtenerUsuarioId();
  proyectoId: number;
  proyecto: Proyecto;
  incidencias: Incidencia[];
  nuevaIncidencia: Incidencia;
  proyectosUsuario: Proyecto[];
  guardado: boolean;
  primeraCarga: boolean;

  constructor(private api: API, private autenticacion: Autenticacion, private modalService: NgbModal) {
    this.incidencias = [];
    this.proyectosUsuario = [];
  }

  ngOnInit() {
    this.nuevaIncidencia = new Incidencia();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }

  proyectoSeleccionado(proyectoId: number){
    this.proyectoId = proyectoId;
    this.nuevaIncidencia.proyectoId = proyectoId;
    this.incidencias = undefined;
    this.cargarProyecto();
  }

  cargarProyecto() {
    this.api.getPorId(NOMBRE_ENTIDAD_PROYECTO, this.proyectoId.toString()).subscribe(
      respuesta => {
        this.proyecto = respuesta as Proyecto;
        this.cargarIncidencias();
        this.primeraCarga = true;
      },
      error => this.api.manejadorErrores(error));
  }

  cargarIncidencias() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_INCIDENCIA, ['proyecto', this.proyectoId.toString()]).subscribe(
      respuesta => {
        this.incidencias = respuesta as Incidencia[];
      },
      error => this.api.manejadorErrores(error)
    );
  }

  guardarAltaRapida() {
    this.api.post(NOMBRE_ENTIDAD_INCIDENCIA, this.nuevaIncidencia).subscribe(
      respuesta => {
        this.incidencias.push(respuesta as Incidencia);
        this.nuevaIncidencia = new Incidencia();
      });
  }

  eliminarRegistro(id: number) {
    this.api.deletePorId(NOMBRE_ENTIDAD_INCIDENCIA, id.toString()).subscribe(
      () => {
        this.incidencias.splice(this.incidencias.findIndex(r => r.id == id), 1);
      });
  }
}
