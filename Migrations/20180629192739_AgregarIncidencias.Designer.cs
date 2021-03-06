﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WorkLogger.Models;

namespace WorkLogger.Migrations
{
    [DbContext(typeof(ContextoWorkLogger))]
    [Migration("20180629192739_AgregarIncidencias")]
    partial class AgregarIncidencias
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("WorkLogger.Models.Incidencia", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Descripcion");

                    b.Property<DateTime>("FechaIncidencia");

                    b.Property<long>("ProyectoId");

                    b.Property<string>("Titulo");

                    b.Property<long>("UsuarioId");

                    b.HasKey("Id");

                    b.ToTable("Incidencia");
                });

            modelBuilder.Entity("WorkLogger.Models.Proyecto", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Nombre");

                    b.Property<int>("Tipo");

                    b.Property<int>("UsuarioId");

                    b.HasKey("Id");

                    b.ToTable("Proyecto");
                });

            modelBuilder.Entity("WorkLogger.Models.RegistroHora", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("FechaHora");

                    b.Property<int>("ProyectoId");

                    b.HasKey("Id");

                    b.ToTable("Registro");
                });

            modelBuilder.Entity("WorkLogger.Models.Usuario", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Correo");

                    b.Property<string>("NombreUsuario");

                    b.Property<string>("Password");

                    b.Property<string>("Salt");

                    b.HasKey("Id");

                    b.HasIndex("Correo")
                        .IsUnique();

                    b.HasIndex("NombreUsuario")
                        .IsUnique();

                    b.ToTable("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
