using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProductFromSPT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalesPerformanceTeams_Products_SPTProductId",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropIndex(
                name: "IX_SalesPerformanceTeams_SPTProductId",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTProductId",
                table: "SalesPerformanceTeams");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SPTProductId",
                table: "SalesPerformanceTeams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTProductId",
                table: "SalesPerformanceTeams",
                column: "SPTProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesPerformanceTeams_Products_SPTProductId",
                table: "SalesPerformanceTeams",
                column: "SPTProductId",
                principalTable: "Products",
                principalColumn: "ProductId");
        }
    }
}
