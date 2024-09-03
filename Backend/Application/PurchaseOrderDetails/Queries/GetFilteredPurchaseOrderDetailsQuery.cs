using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrderDetails.Queries
{
    public class GetFilteredPurchaseOrderDetailsQuery : PurchaseOrderDetailFilters, IRequest<ApiResponseDto> { }

    public class GetFilteredPurchaseOrderDetailsQueryHandler : IRequestHandler<GetFilteredPurchaseOrderDetailsQuery, ApiResponseDto>
    {
        private readonly IPurchaseOrderDetailRepository _purchaseOrderDetailRepository;
        private readonly IMapper _mapper;

        public GetFilteredPurchaseOrderDetailsQueryHandler(
            IPurchaseOrderDetailRepository purchaseOrderDetailRepository, 
            IMapper mapper
            )
        {
            _purchaseOrderDetailRepository = purchaseOrderDetailRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetFilteredPurchaseOrderDetailsQuery request, CancellationToken cancellationToken)
        {
            var filteredDetails = await _purchaseOrderDetailRepository.GetFilteredDetails(request);
            var mappedDetails = _mapper.Map<PaginatedPurchaseOrderDetailsDto>(filteredDetails);

            return new ApiResponseDto
            {
                Message = "Se han recuperador los detalles correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedDetails

            };
        }
    }
}
