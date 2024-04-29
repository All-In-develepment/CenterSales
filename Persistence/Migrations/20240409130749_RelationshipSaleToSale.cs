using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RelationshipSaleToSale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sellers_Projects_ProjectId",
                table: "Sellers");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_SellerId",
                table: "Sales",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Sellers_SellerId",
                table: "Sales",
                column: "SellerId",
                principalTable: "Sellers",
                principalColumn: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sellers_Projects_ProjectId",
                table: "Sellers",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Sellers_SellerId",
                table: "Sales");

            migrationBuilder.DropForeignKey(
                name: "FK_Sellers_Projects_ProjectId",
                table: "Sellers");

            migrationBuilder.DropIndex(
                name: "IX_Sales_SellerId",
                table: "Sales");

            migrationBuilder.AddForeignKey(
                name: "FK_Sellers_Projects_ProjectId",
                table: "Sellers",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
