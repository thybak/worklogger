using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public enum ProyectoTipo
    {
        Ninguno = 0,
        Ocio = 1,
        Laboral = 2
    }
    public class Proyecto : ICopiable<Proyecto>
    {
        [Key]
        public long Id { get; set; }
        public string Nombre { get; set; }
        public ProyectoTipo Tipo { get; set; }
        [ForeignKey("Usuario")]
        public int UsuarioId { get; set; }

        public void CopiarPropiedades(Proyecto proyecto)
        {
            Nombre = proyecto.Nombre;
            Tipo = proyecto.Tipo;
            UsuarioId = proyecto.UsuarioId;
        }
    }
}
