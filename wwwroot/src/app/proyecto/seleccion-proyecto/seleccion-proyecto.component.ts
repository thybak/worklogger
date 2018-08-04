import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { API } from '../../utiles/api.service';
import { NOMBRE_ENTIDAD_PROYECTO, Proyecto, CacheProyectos } from '../../modelos/proyecto';
import { Autenticacion } from '../../utiles/auth.service';

@Component({
  selector: 'app-seleccion-proyecto',
  templateUrl: './seleccion-proyecto.component.html',
  styles: []
})
export class SeleccionProyectoComponent implements OnInit {
  readonly usuarioId: number = this.auth.obtenerUsuarioId();
  proyectosUsuario: Proyecto[];
  proyectoId: number;
  @Input() soloLectura: boolean;
  @Output() proyectoSeleccionado: EventEmitter<number> =  new EventEmitter<number>();

  constructor(private api: API, private auth: Autenticacion) { }

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    if (CacheProyectos.tieneEntradas(this.usuarioId)){
      this.proyectosUsuario = CacheProyectos.obtener(this.usuarioId);
      this.seleccionarPrimero();
    } else {
      this.api.getPorParametros(NOMBRE_ENTIDAD_PROYECTO, ['usuario', this.usuarioId.toString()]).subscribe(
        respuesta => {
          this.proyectosUsuario = respuesta as Proyecto[];
          CacheProyectos.introducir(this.usuarioId, this.proyectosUsuario);
          this.seleccionarPrimero();
        },
        error => { 
          this.api.manejadorErrores(error);
        }
      );
    }
  }

  seleccionarPrimero(){
    if (this.proyectosUsuario.length > 0) {
      this.proyectoId = this.proyectosUsuario[0].id;
      this.proyectoSeleccionado.emit(this.proyectoId);
    }
  }

  seleccionarProyecto(){
    this.proyectoSeleccionado.emit(this.proyectoId);
  }
}
