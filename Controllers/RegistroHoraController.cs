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
    public class RegistroHoraController : BaseController
    {
        private const string NOMBRE_OBTENCION_REGISTRO_HORA = "ObtenerRegistro";

        public RegistroHoraController(ContextoWorkLogger contexto) : base(contexto) { }

        [HttpGet("{id}", Name = NOMBRE_OBTENCION_REGISTRO_HORA)]
        public IActionResult Obtener(long id)
        {
            var registro = _contexto.Registro.FirstOrDefault(r => r.Id == id);
            if (registro == null)
            {
                return NotFound();
            }
            return new ObjectResult(registro);
        }

        [HttpGet("{id}/{fecha}")]
        public IActionResult ObtenerTodosPorProyectoYFecha(long id, DateTime fecha){
            var proyectoDB = _contexto.Proyecto.FirstOrDefault(p => p.Id == id);
            if (proyectoDB == null){
                return NotFound();
            }

            var registros = _contexto.Registro.Where(r => r.ProyectoId == proyectoDB.Id && r.FechaHora.Date == fecha.Date);
            return new ObjectResult(registros.OrderBy(r => r.FechaHora));
        }

        [HttpPost]
        public IActionResult Crear([FromBody] RegistroHora registro)
        {
            if (registro == null)
            {
                return BadRequest();
            }

            if (registro.FechaHora == null || registro.FechaHora == DateTime.MinValue) {
                registro.FechaHora = DateTime.Now;
            }

            _contexto.Registro.Add(registro);
            _contexto.SaveChanges();

            return CreatedAtRoute(NOMBRE_OBTENCION_REGISTRO_HORA, new { id = registro.Id }, registro);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(long id, [FromBody] RegistroHora registro)
        {
            if (registro == null || registro.Id != id)
            {
                return BadRequest();
            }

            var registroDB = _contexto.Registro.FirstOrDefault(r => r.Id == id);
            if (registroDB == null)
            {
                return NotFound();
            }

            registroDB.CopiarPropiedades(registro);
            _contexto.Registro.Update(registroDB);
            _contexto.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(long id)
        {
            var registro = _contexto.Registro.FirstOrDefault(r => r.Id == id);
            if (registro == null)
            {
                return NotFound();
            }

            _contexto.Registro.Remove(registro);
            _contexto.SaveChanges();

            return new NoContentResult();
        }
    }
}