﻿using Application.Common.Models;
using Application.Employees.Dtos;
using Application.Products.Dtos;
using Application.PurchaseOrderDetails.Dtos;
using Application.PurchaseOrders.Commands.CreatePurchaseOrder;
using Application.PurchaseOrders.Commands.UpdatePurchaseOrder;
using Application.PurchaseOrders.Dto;
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

            //PURCHASE ORDERS
            CreateMap<CreatePurchaseOrderCommand, PurchaseOrderEntity>()
                .ForMember(dest => dest.SupplierEntityId, opt => opt.MapFrom(src => src.SupplierId))
                .ReverseMap();

            CreateMap<PurchaseOrderEntity, PurchaseOrderDto>().ReverseMap();


            CreateMap<Pagination<PurchaseOrderEntity>, PaginatedPurchasesDto>()
                .ForMember(dest => dest.Items, opts => opts.MapFrom(src => src.Items))
                .ReverseMap();

            CreateMap<UpdatePurchaseOrderCommand, PurchaseOrderEntity>()
               .ForMember(dest => dest.SupplierEntityId, opts => opts.MapFrom(src => src.SupplierId))
               .ReverseMap();
            //PURCHASE ORDER DETAILS
            CreateMap<CreatePurchaseOrderDetailDto, PurchaseOrderDetailEntity>()
                 .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
                .ReverseMap();  

            CreateMap<Pagination<PurchaseOrderDetailEntity>, PaginatedPurchaseOrderDetailsDto>()
                .ForMember(dest => dest.Items, opts => opts.MapFrom(src => src.Items))
                .ReverseMap();

            CreateMap<PurchaseOrderDetailEntity, PurchaseOrderDetailDto>().ReverseMap();

            CreateMap<UpdatePurchaseOrderDetailDto, PurchaseOrderDetailEntity>()
               .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
               .ForMember(dest => dest.ModifiedAt, opts => opts.MapFrom(src => DateTime.Now))
               .ReverseMap();

        }
    }
}
