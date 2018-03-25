using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public class RegistroHora : ICopiable<RegistroHora>
    {
        [Key]
        public int Id { get; set; }
        public DateTime FechaHora { get; set; }
        [ForeignKey("Proyecto")]
        public int ProyectoId { get; set; }


        public void CopiarPropiedades(RegistroHora registro)
        {
            FechaHora = registro.FechaHora;
            ProyectoId = registro.ProyectoId;
        }
    }
}
