using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class IncidenciaController : BaseController
    {
        private const string NOMBRE_OBTENCION_INCIDENCIA = "ObtenerIncidencia";

        public IncidenciaController(ContextoWorkLogger contexto) : base (contexto) { }

        [HttpGet("{id}", Name = NOMBRE_OBTENCION_INCIDENCIA)]
        public IActionResult Obtener(long id)
        {
            var incidencia = _contexto.Incidencia.FirstOrDefault(p => p.Id == id);
            if (incidencia == null)
            {
                return NotFound();
            }
            return new ObjectResult(incidencia);
        }

        [HttpGet("proyecto/{proyectoId}")]
        public IActionResult ObtenerPorProyectoId(long proyectoId){
            var incidencias = _contexto.Incidencia.Where(p => p.ProyectoId == proyectoId);
            if (incidencias == null || incidencias.Count() == 0){
                return NotFound();
            }
            return new ObjectResult(incidencias);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Incidencia incidencia)
        {
            if (incidencia == null)
            {
                return BadRequest();
            }

            _contexto.Incidencia.Add(incidencia);
            _contexto.SaveChanges();

            return CreatedAtRoute(NOMBRE_OBTENCION_INCIDENCIA, new { id = incidencia.Id }, incidencia);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(long id, [FromBody] Incidencia incidencia)
        {
            if (incidencia == null || incidencia.Id != id)
            {
                return BadRequest();
            }

            var incidenciaDB = _contexto.Incidencia.FirstOrDefault(p => p.Id == id);
            if (incidenciaDB == null)
            {
                return NotFound();
            }

            incidenciaDB.CopiarPropiedades(incidencia);
            _contexto.Incidencia.Update(incidenciaDB);
            _contexto.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(long id)
        {
            var incidencia = _contexto.Incidencia.FirstOrDefault(p => p.Id == id);
            if (incidencia == null)
            {
                return NotFound();
            }

            _contexto.Incidencia.Remove(incidencia);
            _contexto.SaveChanges();

            return new NoContentResult();
        }
    }
}