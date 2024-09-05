using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraestructure.Persistence.Migrations
{
    public partial class InitialMigrationForMysql : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Lastname = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    File = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BusinessName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    AvailableQuantity = table.Column<int>(type: "int", nullable: false),
                    ProductEntityId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stocks_Products_ProductEntityId",
                        column: x => x.ProductEntityId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PurchaseOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SupplierEntityId = table.Column<int>(type: "int", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Suppliers_SupplierEntityId",
                        column: x => x.SupplierEntityId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PurchaseOrderDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PurchaseOrderEntityId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    PriceByUnit = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ProductEntityId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDetails_Products_ProductEntityId",
                        column: x => x.ProductEntityId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDetails_PurchaseOrders_PurchaseOrderEntityId",
                        column: x => x.PurchaseOrderEntityId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Receptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PurchaseOrderEntityId = table.Column<int>(type: "int", nullable: false),
                    EmployeeEntityId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Receptions_Employees_EmployeeEntityId",
                        column: x => x.EmployeeEntityId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Receptions_PurchaseOrders_PurchaseOrderEntityId",
                        column: x => x.PurchaseOrderEntityId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ReceptionDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuantityReceived = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReceptionEntityId = table.Column<int>(type: "int", nullable: false),
                    ProductEntityId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceptionDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceptionDetails_Products_ProductEntityId",
                        column: x => x.ProductEntityId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReceptionDetails_Receptions_ReceptionEntityId",
                        column: x => x.ReceptionEntityId,
                        principalTable: "Receptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "CreatedAt", "File", "Lastname", "ModifiedAt", "Name", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7140), "abordon", "Bordon Alvarez", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Axel Mariano", "3515419198" },
                    { 2, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7163), "vherrera", "Herrera", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Victoria Soledad", "3515419198" },
                    { 3, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7164), "lbordon", "Bordon", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lucas", "3515419198" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedAt", "Description", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7372), "16 RAM 256gb", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Notebook Bangho" },
                    { 2, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7374), "128GB almacenamiento, 6GB RAM", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Smartphone Samsung Galaxy" },
                    { 3, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7375), "256GB almacenamiento, pantalla Retina", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tablet Apple iPad" },
                    { 4, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7376), "Full HD, 75Hz, IPS", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Monitor Dell 24\"" },
                    { 5, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7377), "RGB, switches mecánicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Teclado mecánico Logitech" },
                    { 6, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7378), "DPI ajustable, 2.4GHz", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mouse inalámbrico Razer" },
                    { 7, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7379), "1TB, NVMe M.2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Disco SSD Kingston" },
                    { 8, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7380), "Cancelación de ruido, Bluetooth", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Auriculares Bose" },
                    { 9, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7381), "24MP, 4K video, lente 18-55mm", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cámara Sony Alpha" },
                    { 10, new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7382), "GPS, 44mm, resistente al agua", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Smartwatch Apple Watch" }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "Id", "Address", "BusinessName", "CreatedAt", "Description", "ModifiedAt" },
                values: new object[,]
                {
                    { 1, "1234 Tech Park Avenue, San Francisco, CA", "Tech Distributions Inc.", new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7412), "Distribuidor de hardware y componentes electrónicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "5678 Innovation Blvd, Austin, TX", "Gadget World", new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7414), "Proveedor de gadgets y accesorios electrónicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "91011 Silicon Valley, Palo Alto, CA", "CompuParts Ltd.", new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7416), "Especialistas en componentes para PCs y laptops", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "1213 Tech Drive, New York, NY", "Global Tech Supplies", new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7417), "Proveedor global de soluciones tecnológicas", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "1415 Digital Lane, Seattle, WA", "Smart Solutions Co.", new DateTime(2024, 9, 5, 8, 35, 22, 347, DateTimeKind.Local).AddTicks(7419), "Proveedor de dispositivos inteligentes y tecnología IoT", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDetails_ProductEntityId",
                table: "PurchaseOrderDetails",
                column: "ProductEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDetails_PurchaseOrderEntityId",
                table: "PurchaseOrderDetails",
                column: "PurchaseOrderEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_SupplierEntityId",
                table: "PurchaseOrders",
                column: "SupplierEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceptionDetails_ProductEntityId",
                table: "ReceptionDetails",
                column: "ProductEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceptionDetails_ReceptionEntityId",
                table: "ReceptionDetails",
                column: "ReceptionEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_EmployeeEntityId",
                table: "Receptions",
                column: "EmployeeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_PurchaseOrderEntityId",
                table: "Receptions",
                column: "PurchaseOrderEntityId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_ProductEntityId",
                table: "Stocks",
                column: "ProductEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseOrderDetails");

            migrationBuilder.DropTable(
                name: "ReceptionDetails");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "Receptions");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "PurchaseOrders");

            migrationBuilder.DropTable(
                name: "Suppliers");
        }
    }
}
