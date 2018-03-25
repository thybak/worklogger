using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WorkLogger.Migrations
{
    public partial class EliminarFKRegistroHora : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Registro_Proyecto_ProyectoId",
                table: "Registro");

            migrationBuilder.DropIndex(
                name: "IX_Registro_ProyectoId",
                table: "Registro");

            migrationBuilder.AlterColumn<int>(
                name: "ProyectoId",
                table: "Registro",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "ProyectoId",
                table: "Registro",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Registro_ProyectoId",
                table: "Registro",
                column: "ProyectoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Registro_Proyecto_ProyectoId",
                table: "Registro",
                column: "ProyectoId",
                principalTable: "Proyecto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
