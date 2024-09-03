using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Commands.CreatePurchaseOrder
{
    public class CreatePurchaseOrderCommand  : IRequest<ApiResponseDto>
    {
        [JsonPropertyName("supplier_id")]
        public int SupplierId { get; set; }
        [JsonPropertyName("delivery_date")]
        public DateTime DeliveryDate { get; set; }
        public List<CreatePurchaseOrderDetailDto> Details { get; set; }
    }

    public class CreatePurchaseOrderCommandHandler : IRequestHandler<CreatePurchaseOrderCommand, ApiResponseDto>
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreatePurchaseOrderCommandHandler(
            IPurchaseOrderRepository purchaseOrderRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper
            )
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(CreatePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var purchaseEntity = _mapper.Map<PurchaseOrderEntity>(request);
            await _purchaseOrderRepository.Insert(purchaseEntity);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "Se creo la orden de compra correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = true
            };
        }
    }
}
