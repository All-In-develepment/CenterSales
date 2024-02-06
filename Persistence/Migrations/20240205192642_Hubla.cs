using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Hubla : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FutebolVirtualGames");

            migrationBuilder.DropTable(
                name: "FutebolVirtualLeagues");

            migrationBuilder.CreateTable(
                name: "HublaEventCanceledSales",
                columns: table => new
                {
                    HublaEventCanceledSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Recurring = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreditCardLR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    IsRenewing = table.Column<bool>(type: "bit", nullable: false),
                    SellerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserDocument = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaEventCanceledSales", x => x.HublaEventCanceledSaleId);
                });

            migrationBuilder.CreateTable(
                name: "HublaEventNewSales",
                columns: table => new
                {
                    HublaEventNewSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Recurring = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    IsRenewing = table.Column<bool>(type: "bit", nullable: false),
                    SellerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserDocument = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaEventNewSales", x => x.HublaEventNewSaleId);
                });

            migrationBuilder.CreateTable(
                name: "HublaEventNewUsers",
                columns: table => new
                {
                    HublaEventNewUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    SellerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserDocument = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaEventNewUsers", x => x.HublaEventNewUserId);
                });

            migrationBuilder.CreateTable(
                name: "HublaCanceledSales",
                columns: table => new
                {
                    HublaCanceledSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventHublaEventCanceledSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaCanceledSales", x => x.HublaCanceledSaleId);
                    table.ForeignKey(
                        name: "FK_HublaCanceledSales_HublaEventCanceledSales_EventHublaEventCanceledSaleId",
                        column: x => x.EventHublaEventCanceledSaleId,
                        principalTable: "HublaEventCanceledSales",
                        principalColumn: "HublaEventCanceledSaleId");
                });

            migrationBuilder.CreateTable(
                name: "HublaAffiliates",
                columns: table => new
                {
                    HublaAffiliateId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AffiliateAmount = table.Column<int>(type: "int", nullable: false),
                    AffiliateId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AffiliateName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HublaEventCanceledSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    HublaEventNewSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaAffiliates", x => x.HublaAffiliateId);
                    table.ForeignKey(
                        name: "FK_HublaAffiliates_HublaEventCanceledSales_HublaEventCanceledSaleId",
                        column: x => x.HublaEventCanceledSaleId,
                        principalTable: "HublaEventCanceledSales",
                        principalColumn: "HublaEventCanceledSaleId");
                    table.ForeignKey(
                        name: "FK_HublaAffiliates_HublaEventNewSales_HublaEventNewSaleId",
                        column: x => x.HublaEventNewSaleId,
                        principalTable: "HublaEventNewSales",
                        principalColumn: "HublaEventNewSaleId");
                });

            migrationBuilder.CreateTable(
                name: "HublaNewSales",
                columns: table => new
                {
                    HublaNewSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventHublaEventNewSaleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaNewSales", x => x.HublaNewSaleId);
                    table.ForeignKey(
                        name: "FK_HublaNewSales_HublaEventNewSales_EventHublaEventNewSaleId",
                        column: x => x.EventHublaEventNewSaleId,
                        principalTable: "HublaEventNewSales",
                        principalColumn: "HublaEventNewSaleId");
                });

            migrationBuilder.CreateTable(
                name: "HublaNewUsers",
                columns: table => new
                {
                    HublaNewUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventHublaEventNewUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HublaNewUsers", x => x.HublaNewUserId);
                    table.ForeignKey(
                        name: "FK_HublaNewUsers_HublaEventNewUsers_EventHublaEventNewUserId",
                        column: x => x.EventHublaEventNewUserId,
                        principalTable: "HublaEventNewUsers",
                        principalColumn: "HublaEventNewUserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HublaAffiliates_HublaEventCanceledSaleId",
                table: "HublaAffiliates",
                column: "HublaEventCanceledSaleId");

            migrationBuilder.CreateIndex(
                name: "IX_HublaAffiliates_HublaEventNewSaleId",
                table: "HublaAffiliates",
                column: "HublaEventNewSaleId");

            migrationBuilder.CreateIndex(
                name: "IX_HublaCanceledSales_EventHublaEventCanceledSaleId",
                table: "HublaCanceledSales",
                column: "EventHublaEventCanceledSaleId");

            migrationBuilder.CreateIndex(
                name: "IX_HublaNewSales_EventHublaEventNewSaleId",
                table: "HublaNewSales",
                column: "EventHublaEventNewSaleId");

            migrationBuilder.CreateIndex(
                name: "IX_HublaNewUsers_EventHublaEventNewUserId",
                table: "HublaNewUsers",
                column: "EventHublaEventNewUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HublaAffiliates");

            migrationBuilder.DropTable(
                name: "HublaCanceledSales");

            migrationBuilder.DropTable(
                name: "HublaNewSales");

            migrationBuilder.DropTable(
                name: "HublaNewUsers");

            migrationBuilder.DropTable(
                name: "HublaEventCanceledSales");

            migrationBuilder.DropTable(
                name: "HublaEventNewSales");

            migrationBuilder.DropTable(
                name: "HublaEventNewUsers");

            migrationBuilder.CreateTable(
                name: "FutebolVirtualGames",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AwayImg = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AwayTeam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinalTimeResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HalfTimeResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeImg = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeTeam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdBet365 = table.Column<int>(type: "int", nullable: false),
                    LeagueId = table.Column<int>(type: "int", nullable: false),
                    SumScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutebolVirtualGames", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FutebolVirtualLeagues",
                columns: table => new
                {
                    VirtualLeagueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VirtualLEagueChangeDate = table.Column<int>(type: "int", nullable: false),
                    VirtualLeagueCompetition = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutebolVirtualLeagues", x => x.VirtualLeagueId);
                });
        }
    }
}
