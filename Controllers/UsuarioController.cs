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
    public class UsuarioController : BaseController
    {
        public UsuarioController(ContextoWorkLogger contexto) : base(contexto) { }
        
        [HttpGet("{id}", Name = "ObtenerUsuario")]
        public IActionResult Obtener(long id)
        {
            var usuario = _contexto.Usuario.FirstOrDefault(u => u.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }
            return new ObjectResult(usuario);
        }
        
        [HttpPost, AllowAnonymous]
        public IActionResult Crear([FromBody] Usuario usuario)
        {
            if (usuario == null || NombreUsuarioEnUso(usuario))
            {
                return BadRequest();
            }

            usuario.GenerarPasswordFirmada();
            _contexto.Usuario.Add(usuario);
            _contexto.SaveChanges();

            return CreatedAtRoute("ObtenerUsuario", new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(long id, [FromBody] Usuario usuario)
        {
            if (usuario == null || usuario.Id != id)
            {
                return BadRequest();
            }

            var usuarioDB = _contexto.Usuario.FirstOrDefault(u => u.Id == id);
            if (usuarioDB == null)
            {
                return NotFound();
            }

            usuarioDB.CopiarPropiedades(usuario);
            _contexto.Usuario.Update(usuarioDB);
            _contexto.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(long id)
        {
            var usuario = _contexto.Usuario.FirstOrDefault(u => u.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            _contexto.Usuario.Remove(usuario);
            _contexto.SaveChanges();

            return new NoContentResult();
        }


        #region Métodos privados
        private bool NombreUsuarioEnUso(Usuario usuario){
            return _contexto.Usuario.FirstOrDefault(x=> x.NombreUsuario == usuario.NombreUsuario) != null;
        }
        #endregion
    }
}