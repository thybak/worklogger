using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public class Incidencia : ICopiable<Incidencia>
    {
        [Key]
        public long Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaIncidencia { get; set; }
        [ForeignKey("Proyecto")]
        public long ProyectoId { get; set; }


        public void CopiarPropiedades(Incidencia incidencia)
        {
            this.Titulo = incidencia.Titulo;
            this.Descripcion = incidencia.Descripcion;
            this.FechaIncidencia = incidencia.FechaIncidencia;
            this.ProyectoId = incidencia.ProyectoId;
        }
    }
}