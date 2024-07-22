using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CreateWeight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectWeights",
                columns: table => new
                {
                    ProjectWeightId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Month = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SalesValueWeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ConversionWeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RegistrationWeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DepositWeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectWeights", x => x.ProjectWeightId);
                    table.ForeignKey(
                        name: "FK_ProjectWeights_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectWeights_ProjectId",
                table: "ProjectWeights",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectWeights");
        }
    }
}
