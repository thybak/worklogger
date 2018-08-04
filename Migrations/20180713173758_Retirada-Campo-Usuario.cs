using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkLogger.Migrations
{
    public partial class RetiradaCampoUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Incidencia");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UsuarioId",
                table: "Incidencia",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
