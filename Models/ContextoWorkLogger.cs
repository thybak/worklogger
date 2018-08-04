using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public class ContextoWorkLogger : DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Proyecto> Proyecto { get; set; }
        public DbSet<RegistroHora> Registro { get; set; }
        public DbSet<Incidencia> Incidencia { get; set; }

        public ContextoWorkLogger(DbContextOptions<ContextoWorkLogger> opciones) : base(opciones) 
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().HasIndex(usuario => usuario.NombreUsuario).IsUnique(true);
            modelBuilder.Entity<Usuario>().HasIndex(usuario => usuario.Correo).IsUnique(true);
        }
    }
}
