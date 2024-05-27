using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSPT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalesPerformanceTeams",
                columns: table => new
                {
                    SPTId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SPTType = table.Column<int>(type: "int", nullable: false),
                    SPTDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SPTTotalLeads = table.Column<int>(type: "int", nullable: false),
                    SPTTotalSales = table.Column<int>(type: "int", nullable: false),
                    SPTAVGLead = table.Column<float>(type: "real", nullable: false),
                    SPTAVGSale = table.Column<float>(type: "real", nullable: false),
                    SPTSellerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SPTProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SPTEventId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SPTProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SPTCreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SPTUpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesPerformanceTeams", x => x.SPTId);
                    table.ForeignKey(
                        name: "FK_SalesPerformanceTeams_Events_SPTEventId",
                        column: x => x.SPTEventId,
                        principalTable: "Events",
                        principalColumn: "EventsId");
                    table.ForeignKey(
                        name: "FK_SalesPerformanceTeams_Products_SPTProductId",
                        column: x => x.SPTProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId");
                    table.ForeignKey(
                        name: "FK_SalesPerformanceTeams_Projects_SPTProjectId",
                        column: x => x.SPTProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId");
                    table.ForeignKey(
                        name: "FK_SalesPerformanceTeams_Sellers_SPTSellerId",
                        column: x => x.SPTSellerId,
                        principalTable: "Sellers",
                        principalColumn: "SellerId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTEventId",
                table: "SalesPerformanceTeams",
                column: "SPTEventId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTProductId",
                table: "SalesPerformanceTeams",
                column: "SPTProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTProjectId",
                table: "SalesPerformanceTeams",
                column: "SPTProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesPerformanceTeams_SPTSellerId",
                table: "SalesPerformanceTeams",
                column: "SPTSellerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesPerformanceTeams");
        }
    }
}
