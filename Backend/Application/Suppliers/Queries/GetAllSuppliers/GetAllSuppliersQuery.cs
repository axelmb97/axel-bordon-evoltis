using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Suppliers.Dtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Suppliers.Queries.GetAllSuppliers
{
    public class GetAllSuppliersQuery: IRequest<ApiResponseDto>{ }

    public class GetAllSuppliersQueryHandler : IRequestHandler<GetAllSuppliersQuery, ApiResponseDto>
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;

        public GetAllSuppliersQueryHandler(ISupplierRepository supplierRepository, IMapper mapper)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetAllSuppliersQuery request, CancellationToken cancellationToken)
        {
            var suppliers = await _supplierRepository.GetAll();
            var mappedSuppliers = _mapper.Map<List<SupplierDto>>(suppliers);

            return new ApiResponseDto
            {
                Message = "Proveedores obtenidos existosamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedSuppliers
            };
        }
    }
}
