using Application.Employees.Dtos;
using Application.Products.Dtos;
using Application.Suppliers.Dtos;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Mapings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //EMPLOYEES
            CreateMap<EmployeeEntity,EmployeeDto>().ReverseMap();

            //PRODUCTS
            CreateMap<ProductEntity, ProductDto>().ReverseMap();

            //SUPPLIERS
            CreateMap<SupplierEntity, SupplierDto>().ReverseMap();
        }
    }
}
