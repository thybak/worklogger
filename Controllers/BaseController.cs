using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    public class BaseController : Controller
    {
        protected readonly ContextoWorkLogger _contexto;

        public BaseController (ContextoWorkLogger contexto)
        {
            this._contexto = contexto;
        }
    }
}
