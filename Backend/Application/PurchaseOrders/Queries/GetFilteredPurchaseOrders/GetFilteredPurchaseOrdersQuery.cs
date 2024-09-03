using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
using Application.PurchaseOrders.Dto;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Queries.GetFilteredPurchaseOrders
{
    public class GetFilteredPurchaseOrdersQuery : PurchaseOrderFiltersDto , IRequest<ApiResponseDto>{ }

    public class GetFilteredPurchaseOrdersQueryHandler : IRequestHandler<GetFilteredPurchaseOrdersQuery, ApiResponseDto>
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetFilteredPurchaseOrdersQueryHandler(
            IPurchaseOrderRepository purchaseOrderRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetFilteredPurchaseOrdersQuery request, CancellationToken cancellationToken)
        {
            var purchasesEntities = await _purchaseOrderRepository.GetFilteredDeliveries(request);
            var mappedPurchases = _mapper.Map<PaginatedPurchasesDto>(purchasesEntities);

            return new ApiResponseDto
            {
                Message = "Se recuperaron las ordenes de compra correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedPurchases
            };
        }
    }
}
