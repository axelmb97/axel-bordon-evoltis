using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Persistence.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(ModelBuilder builder)
        {
            builder.Entity<EmployeeEntity>()
                .HasData(
                    new EmployeeEntity { Id = 1, Name = "Axel Mariano", Lastname = "Bordon Alvarez", File = "abordon", PhoneNumber = "3515419198" },
                    new EmployeeEntity { Id = 2, Name = "Victoria Soledad", Lastname = "Herrera", File = "vherrera", PhoneNumber = "3515419198" },
                    new EmployeeEntity { Id = 3, Name = "Lucas", Lastname = "Bordon", File = "lbordon", PhoneNumber = "3515419198" }
                );

            builder.Entity<ProductEntity>()
                .HasData(
                    new ProductEntity { Id = 1, Name = "Notebook Bangho", Description = "16 RAM 256gb" },
                    new ProductEntity { Id = 2, Name = "Smartphone Samsung Galaxy", Description = "128GB almacenamiento, 6GB RAM" },
                    new ProductEntity { Id = 3, Name = "Tablet Apple iPad", Description = "256GB almacenamiento, pantalla Retina" },
                    new ProductEntity { Id = 4, Name = "Monitor Dell 24\"", Description = "Full HD, 75Hz, IPS" },
                    new ProductEntity { Id = 5, Name = "Teclado mecánico Logitech", Description = "RGB, switches mecánicos" },
                    new ProductEntity { Id = 6, Name = "Mouse inalámbrico Razer", Description = "DPI ajustable, 2.4GHz" },
                    new ProductEntity { Id = 7, Name = "Disco SSD Kingston", Description = "1TB, NVMe M.2" },
                    new ProductEntity { Id = 8, Name = "Auriculares Bose", Description = "Cancelación de ruido, Bluetooth" },
                    new ProductEntity { Id = 9, Name = "Cámara Sony Alpha", Description = "24MP, 4K video, lente 18-55mm" },
                    new ProductEntity { Id = 10, Name = "Smartwatch Apple Watch", Description = "GPS, 44mm, resistente al agua" }
                );

            builder.Entity<SupplierEntity>()
                .HasData(
                    new SupplierEntity { Id = 1, BusinessName = "Tech Distributions Inc.", Address = "1234 Tech Park Avenue, San Francisco, CA", Description = "Distribuidor de hardware y componentes electrónicos" },
                    new SupplierEntity { Id = 2, BusinessName = "Gadget World", Address = "5678 Innovation Blvd, Austin, TX", Description = "Proveedor de gadgets y accesorios electrónicos" },
                    new SupplierEntity { Id = 3, BusinessName = "CompuParts Ltd.", Address = "91011 Silicon Valley, Palo Alto, CA", Description = "Especialistas en componentes para PCs y laptops" },
                    new SupplierEntity { Id = 4, BusinessName = "Global Tech Supplies", Address = "1213 Tech Drive, New York, NY", Description = "Proveedor global de soluciones tecnológicas" },
                    new SupplierEntity { Id = 5, BusinessName = "Smart Solutions Co.", Address = "1415 Digital Lane, Seattle, WA", Description = "Proveedor de dispositivos inteligentes y tecnología IoT" }
                );
        }
    }
}
