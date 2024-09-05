using Application.Common.Models;
using Application.Employees.Dtos;
using Application.Products.Dtos;
using Application.PurchaseOrderDetails.Dtos;
using Application.PurchaseOrders.Commands.CreatePurchaseOrder;
using Application.PurchaseOrders.Commands.UpdatePurchaseOrder;
using Application.PurchaseOrders.Dto;
using Application.ReceptionDetails.Dtos;
using Application.Receptions.Commands.CreateReception;
using Application.Receptions.Commands.UpdateReception;
using Application.Receptions.Dtos;
using Application.Stocks.Commands.CreateStock;
using Application.Stocks.Dtos;
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

            //RECEPTIONS
            CreateMap<CreateReceptionCommand, ReceptionEntity>()
              .ForMember(dest => dest.PurchaseOrderEntityId, opts => opts.MapFrom(src => src.PurchaseOrderId))
              .ForMember(dest => dest.EmployeeEntityId, opts => opts.MapFrom(src => src.EmployeeId))
              .ForMember(dest => dest.Details, opts => opts.MapFrom(src => src.Details))
              .ForMember(dest => dest.ModifiedAt, opts => opts.MapFrom(src => DateTime.Now))
              .ReverseMap();

            CreateMap<ReceptionEntity, ReceptionDto>().ReverseMap();


            CreateMap<Pagination<ReceptionEntity>, PaginatedReceptionsDto>()
                .ForMember(dest => dest.Items, opts => opts.MapFrom(src => src.Items))
                .ReverseMap();

            CreateMap<UpdateReceptionCommand, ReceptionEntity>()
                .ForMember(dest => dest.EmployeeEntityId, opts => opts.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.ModifiedAt, opts => opts.MapFrom(src => DateTime.Now))
                .ReverseMap();

            //RECEPTIONS DETAILS
            CreateMap<CreateReceptionDetailDto, ReceptionDetailEntity>()
              .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
              .ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
              .ForMember(dest => dest.ModifiedAt, opts => opts.MapFrom(src => DateTime.Now))
              .ReverseMap();

            CreateMap<ReceptionDetailEntity, ReceptionDetailDto>().ReverseMap();

            CreateMap<UpdateReceptionDetailDto, ReceptionDetailEntity>()
                .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
                .ReverseMap();

            //STOCK
            CreateMap<CreateReceptionDetailDto, StockEntity>()
                .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
                .ForMember(dest => dest.Quantity, opts => opts.MapFrom(src => src.QuantityReceived))
                .ReverseMap();

            CreateMap<UpdateReceptionDetailDto, ReceptionDetailEntity>()
               .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
               .ReverseMap();

            CreateMap<CreateStockCommand, StockEntity>()
                .ForMember(dest => dest.ProductEntityId, opts => opts.MapFrom(src => src.ProductId))
                .ReverseMap();

            CreateMap<StockEntity, StockDto>().ReverseMap();

            CreateMap<Pagination<StockEntity>, PaginatedStockDto>()
                .ForMember(dest => dest.Items, opts => opts.MapFrom(src => src.Items))
                .ReverseMap();

        }
    }
}
