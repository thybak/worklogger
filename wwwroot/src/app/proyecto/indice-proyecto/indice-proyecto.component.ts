import { Component, OnInit } from '@angular/core';
import { API } from '../../utiles/api.service';
import { Proyecto, ProyectoTipo, NOMBRE_ENTIDAD_PROYECTO } from '../../modelos/proyecto';
import { Autenticacion } from '../../utiles/auth.service';

@Component({
  selector: 'app-indice-proyecto',
  templateUrl: './indice-proyecto.component.html',
  styles: []
})
export class IndiceProyectoComponent implements OnInit {
  readonly usuarioId = this.autenticacion.obtenerUsuarioId();
  altaRegistro: boolean;
  proyectos: Proyecto[];
  proyecto: Proyecto;

  constructor(private api: API, private autenticacion: Autenticacion) {
    this.proyectos = [];
  }

  activarAlta() {
    this.proyecto = new Proyecto();
    this.altaRegistro = true;
  }

  desactivarAlta() {
    this.altaRegistro = false;
  }

  ngOnInit() {
    this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', this.usuarioId.toString()]).subscribe(
      respuesta => {
        let proyectosDB: Proyecto[] = respuesta as Proyecto[];
        for (let proyectoDB of proyectosDB) {
          this.proyectos.push(Object.assign(new Proyecto(), proyectoDB));
        }
      },
      error => {
        console.log("Error ", error);
      }
    );
  }

  eliminarRegistro(id: number) {
    this.api.deletePorId(NOMBRE_ENTIDAD_PROYECTO, id.toString()).subscribe(
      () => {
        this.proyectos.splice(this.proyectos.findIndex(r => r.id == id), 1);
      });
  }

  crearProyecto() {
    this.proyecto.usuarioId = this.usuarioId;
    this.api.post(NOMBRE_ENTIDAD_PROYECTO, this.proyecto).subscribe(
      respuesta => {
        this.proyectos.push(Object.assign(new Proyecto(), respuesta as Proyecto));
        this.desactivarAlta();
        this.proyecto = null;
      },
      error => {
        console.log("Error ", error);
      });
  }

}
