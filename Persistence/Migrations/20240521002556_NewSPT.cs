using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class NewSPT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SPTType",
                table: "SalesPerformanceTeams",
                newName: "SPTTotalRegister");

            migrationBuilder.RenameColumn(
                name: "SPTTotalValue",
                table: "SalesPerformanceTeams",
                newName: "SPTTotalSalesAmont");

            migrationBuilder.RenameColumn(
                name: "SPTAVGSale",
                table: "SalesPerformanceTeams",
                newName: "SPTTotalRegisterAmont");

            migrationBuilder.RenameColumn(
                name: "SPTAVGLead",
                table: "SalesPerformanceTeams",
                newName: "SPTTotalRedepositAmont");

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGConvertion",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGRedeposit",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGRedepositAmont",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGRegister",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGRegisterAmont",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGSales",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "SPTAVGSalesAmont",
                table: "SalesPerformanceTeams",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<Guid>(
                name: "SPTBookmakerId",
                table: "SalesPerformanceTeams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "SPTTotalRedeposit",
                table: "SalesPerformanceTeams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTBookmakerId",
                table: "SalesPerformanceTeams",
                column: "SPTBookmakerId");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesPerformanceTeams_Bookmakers_SPTBookmakerId",
                table: "SalesPerformanceTeams",
                column: "SPTBookmakerId",
                principalTable: "Bookmakers",
                principalColumn: "BookmakerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalesPerformanceTeams_Bookmakers_SPTBookmakerId",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropIndex(
                name: "IX_SalesPerformanceTeams_SPTBookmakerId",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGConvertion",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGRedeposit",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGRedepositAmont",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGRegister",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGRegisterAmont",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGSales",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTAVGSalesAmont",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTBookmakerId",
                table: "SalesPerformanceTeams");

            migrationBuilder.DropColumn(
                name: "SPTTotalRedeposit",
                table: "SalesPerformanceTeams");

            migrationBuilder.RenameColumn(
                name: "SPTTotalSalesAmont",
                table: "SalesPerformanceTeams",
                newName: "SPTTotalValue");

            migrationBuilder.RenameColumn(
                name: "SPTTotalRegisterAmont",
                table: "SalesPerformanceTeams",
                newName: "SPTAVGSale");

            migrationBuilder.RenameColumn(
                name: "SPTTotalRegister",
                table: "SalesPerformanceTeams",
                newName: "SPTType");

            migrationBuilder.RenameColumn(
                name: "SPTTotalRedepositAmont",
                table: "SalesPerformanceTeams",
                newName: "SPTAVGLead");
        }
    }
}
