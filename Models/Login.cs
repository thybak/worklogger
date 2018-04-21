using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public class Login
    {
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
    }
}