using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RegisterToBookmaker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Registers_Bookmaker_BookmakerId",
                table: "Registers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bookmaker",
                table: "Bookmaker");

            migrationBuilder.RenameTable(
                name: "Bookmaker",
                newName: "Bookmakers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bookmakers",
                table: "Bookmakers",
                column: "BookmakerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Registers_Bookmakers_BookmakerId",
                table: "Registers",
                column: "BookmakerId",
                principalTable: "Bookmakers",
                principalColumn: "BookmakerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Registers_Bookmakers_BookmakerId",
                table: "Registers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bookmakers",
                table: "Bookmakers");

            migrationBuilder.RenameTable(
                name: "Bookmakers",
                newName: "Bookmaker");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bookmaker",
                table: "Bookmaker",
                column: "BookmakerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Registers_Bookmaker_BookmakerId",
                table: "Registers",
                column: "BookmakerId",
                principalTable: "Bookmaker",
                principalColumn: "BookmakerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
