using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    public class BaseController : Controller
    {
        protected readonly ContextoWorkLogger _contexto;
        protected long IdUsuario {
            get {
                long idUsuario = -1;
                if (HttpContext.User != null){
                    string identificador = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    idUsuario = !string.IsNullOrEmpty(identificador) ? long.Parse(identificador) : idUsuario;
                }
                return idUsuario;
            }
        }

        public BaseController (ContextoWorkLogger contexto)
        {
            this._contexto = contexto;
        }
    }
}
