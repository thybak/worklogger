using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WorkLogger.Migrations
{
    public partial class RenombrarEsquemas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proyecto_Usuario_UsuarioId",
                table: "Proyecto");

            migrationBuilder.DropIndex(
                name: "IX_Proyecto_UsuarioId",
                table: "Proyecto");

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Proyecto",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "UsuarioId",
                table: "Proyecto",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Proyecto_UsuarioId",
                table: "Proyecto",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proyecto_Usuario_UsuarioId",
                table: "Proyecto",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
