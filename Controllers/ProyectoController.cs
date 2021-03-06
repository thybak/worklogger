﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class ProyectoController : BaseController
    {
        private const string NOMBRE_OBTENCION_PROYECTO = "ObtenerProyecto";

        public ProyectoController(ContextoWorkLogger contexto) : base (contexto) { }

        [HttpGet("{id}", Name = NOMBRE_OBTENCION_PROYECTO)]
        public IActionResult Obtener(long id)
        {
            var proyecto = _contexto.Proyecto.FirstOrDefault(p => p.Id == id);
            if (proyecto == null)
            {
                return NotFound();
            }
            return new ObjectResult(proyecto);
        }

        [HttpGet("usuario/{usuarioId}")]
        public IActionResult ObtenerPorUsuarioId(long usuarioId){
            var proyectos = _contexto.Proyecto.Where(p => p.UsuarioId == usuarioId);
            if (proyectos == null || proyectos.Count() == 0){
                return NotFound();
            }
            return new ObjectResult(proyectos);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Proyecto proyecto)
        {
            if (proyecto == null)
            {
                return BadRequest();
            }

            _contexto.Proyecto.Add(proyecto);
            _contexto.SaveChanges();

            return CreatedAtRoute(NOMBRE_OBTENCION_PROYECTO, new { id = proyecto.Id }, proyecto);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(long id, [FromBody] Proyecto proyecto)
        {
            if (proyecto == null || proyecto.Id != id)
            {
                return BadRequest();
            }

            var proyectoDB = _contexto.Proyecto.FirstOrDefault(p => p.Id == id);
            if (proyectoDB == null)
            {
                return NotFound();
            }

            proyectoDB.CopiarPropiedades(proyecto);
            _contexto.Proyecto.Update(proyectoDB);
            _contexto.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(long id)
        {
            var proyecto = _contexto.Proyecto.FirstOrDefault(p => p.Id == id);
            if (proyecto == null)
            {
                return NotFound();
            }

            // Antes de eliminar el proyecto nos aseguramos de eliminar los registros de tiempos para no dejar basura en la base de datos.
            _contexto.Registro.RemoveRange(_contexto.Registro.Where(x=>x.ProyectoId == proyecto.Id));
            _contexto.Proyecto.Remove(proyecto);
            _contexto.SaveChanges();

            return new NoContentResult();
        }
    }
}