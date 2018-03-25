using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public static class Utils
    {
        /// <summary>
        /// Genera un salt aleatorio, dispuesto a ser utilizado junto a un texto para firmar
        /// </summary>
        /// <returns></returns>
        public static string ObtenerSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        /// <summary>
        /// Dados un texto y un salt aleatorio, genera un texto firmado
        /// </summary>
        /// <param name="texto"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        public static string ObtenerTextoHasheado(string texto, string salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: texto,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
