using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkLogger.Migrations
{
    public partial class AddFechaFinIncidencia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "FechaFinIncidencia",
                table: "Incidencia",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FechaFinIncidencia",
                table: "Incidencia");
        }
    }
}
