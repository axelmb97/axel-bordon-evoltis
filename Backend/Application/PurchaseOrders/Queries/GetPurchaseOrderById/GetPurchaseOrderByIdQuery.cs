using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrders.Dto;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Queries.GetPurchaseOrderById
{
    public class GetPurchaseOrderByIdQuery : IRequest<ApiResponseDto>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }

    public class GetPurchaseOrderByIdQueryHandler : IRequestHandler<GetPurchaseOrderByIdQuery, ApiResponseDto>
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetPurchaseOrderByIdQueryHandler(
            IPurchaseOrderRepository purchaseOrderRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper
            )
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetPurchaseOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var purchaseOrder = await _purchaseOrderRepository.GetById(request.Id);
            if (purchaseOrder is null) {
                return new ApiResponseDto { 
                    Message = "No existe la orden de compra buscada",
                    StatusCode = (int) HttpStatusCode.NotFound,
                    Response = null
                };
            }

            var purchaseOrderMap = _mapper.Map<PurchaseOrderDto>(purchaseOrder);

            return new ApiResponseDto
            {
                Message = "Orden de compra encontrada exitosamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = purchaseOrderMap
            };
        }
    }
}
