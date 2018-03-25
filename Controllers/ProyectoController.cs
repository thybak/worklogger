using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    [Route("api/[controller]")]
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

            _contexto.Proyecto.Remove(proyecto);
            _contexto.SaveChanges();

            return new NoContentResult();
        }
    }
}