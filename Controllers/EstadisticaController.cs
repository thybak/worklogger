using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class EstadisticaController : BaseController
    {
        public EstadisticaController(ContextoWorkLogger contexto) : base(contexto) {}

        [HttpGet("proyecto/{proyectoId}/{fechaInicio}/{fechaFin}")]
        public ActionResult ObtenerRegistrosFechas(long proyectoId, DateTime fechaInicio, DateTime fechaFin) {
            var proyectoDB = _contexto.Proyecto.FirstOrDefault(x=>x.Id == proyectoId);
            if (proyectoDB == null){
                return NotFound();
            }
            var registros = _contexto.Registro.Where(x=>x.ProyectoId == proyectoId && x.FechaHora >= fechaInicio && x.FechaHora <= fechaFin);
            var estadisticaRegistros = new EstadisticaRegistros(registros.ToList(), fechaInicio, fechaFin);
            
            return new ObjectResult(estadisticaRegistros);
        }

        public ActionResult ObtenerRegistrosMes(long proyectoId, DateTime mes){
            return NoContent();
        }
    }
}