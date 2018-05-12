using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WorkLogger.Models;

namespace WorkLogger.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : BaseController
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config, ContextoWorkLogger contexto) : base(contexto)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]Login login)
        {
            IActionResult respuesta = NotFound();
            var user = BuscarUsuario(login);

            if (user != null)
            {
                var tokenString = ObtenerToken(user);
                respuesta = Ok(new { token = tokenString });
            }

            return respuesta;
        }

        #region Métodos auxiliares
        private string ObtenerToken(Usuario usuario)
        {
            var clave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var claveFirmada = new SigningCredentials(clave, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString())
            };
            var token = new JwtSecurityToken(
              _config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: claveFirmada);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private Usuario BuscarUsuario(Login login)
        {
            Usuario usuario = _contexto.Usuario.FirstOrDefault(usu => usu.NombreUsuario == login.NombreUsuario);
            
            if (usuario != null){
                // Hasheamos la contraseña que nos llega para comprobar si coincide con la del usuario
                login.Password = Utils.ObtenerTextoHasheado(login.Password, usuario.Salt);    
                usuario = login.Password == usuario.Password ? usuario : null;
            }

            return usuario;
        }
        #endregion
    }
}