using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public class Usuario : ICopiable<Usuario>
    {
        [Key]
        public long Id { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }

        public void CopiarPropiedades(Usuario usuario)
        {
            NombreUsuario = usuario.NombreUsuario;
            Correo = usuario.Correo;
            Password = usuario.Password;
            GenerarPasswordFirmada();
        }

        public void GenerarPasswordFirmada()
        {
            Salt = Utils.ObtenerSalt();
            Password = Utils.ObtenerTextoHasheado(Password, Salt);
        }
    }
}
