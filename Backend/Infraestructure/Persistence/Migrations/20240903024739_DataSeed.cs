using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infraestructure.Persistence.Migrations
{
    public partial class DataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "CreatedAt", "File", "Lastname", "ModifiedAt", "Name", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4737), "abordon", "Bordon Alvarez", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Axel Mariano", "3515419198" },
                    { 2, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4752), "vherrera", "Herrera", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Victoria Soledad", "3515419198" },
                    { 3, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4753), "lbordon", "Bordon", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lucas", "3515419198" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CreatedAt", "Description", "ModifiedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4880), "16 RAM 256gb", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Notebook Bangho" },
                    { 2, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4881), "128GB almacenamiento, 6GB RAM", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Smartphone Samsung Galaxy" },
                    { 3, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4882), "256GB almacenamiento, pantalla Retina", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tablet Apple iPad" },
                    { 4, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4883), "Full HD, 75Hz, IPS", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Monitor Dell 24\"" },
                    { 5, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4884), "RGB, switches mecánicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Teclado mecánico Logitech" },
                    { 6, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4884), "DPI ajustable, 2.4GHz", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mouse inalámbrico Razer" },
                    { 7, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4885), "1TB, NVMe M.2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Disco SSD Kingston" },
                    { 8, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4885), "Cancelación de ruido, Bluetooth", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Auriculares Bose" },
                    { 9, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4886), "24MP, 4K video, lente 18-55mm", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cámara Sony Alpha" },
                    { 10, new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4886), "GPS, 44mm, resistente al agua", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Smartwatch Apple Watch" }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "Id", "Address", "BusinessName", "CreatedAt", "Description", "ModifiedAt" },
                values: new object[,]
                {
                    { 1, "1234 Tech Park Avenue, San Francisco, CA", "Tech Distributions Inc.", new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4906), "Distribuidor de hardware y componentes electrónicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "5678 Innovation Blvd, Austin, TX", "Gadget World", new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4907), "Proveedor de gadgets y accesorios electrónicos", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "91011 Silicon Valley, Palo Alto, CA", "CompuParts Ltd.", new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4908), "Especialistas en componentes para PCs y laptops", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "1213 Tech Drive, New York, NY", "Global Tech Supplies", new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4909), "Proveedor global de soluciones tecnológicas", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "1415 Digital Lane, Seattle, WA", "Smart Solutions Co.", new DateTime(2024, 9, 2, 23, 47, 38, 904, DateTimeKind.Local).AddTicks(4909), "Proveedor de dispositivos inteligentes y tecnología IoT", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
