using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRelathionshipProjetToRegister : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "RegisterAVGConversion",
                table: "Registers",
                type: "float(18)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Registers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Registers_ProjectId",
                table: "Registers",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Registers_Projects_ProjectId",
                table: "Registers",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Registers_Projects_ProjectId",
                table: "Registers");

            migrationBuilder.DropIndex(
                name: "IX_Registers_ProjectId",
                table: "Registers");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Registers");

            migrationBuilder.AlterColumn<float>(
                name: "RegisterAVGConversion",
                table: "Registers",
                type: "real",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(18)");
        }
    }
}
