using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Products.Dtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<ApiResponseDto> { }

    public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, ApiResponseDto>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetAllProductsQueryHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _productRepository.GetAll();
            var mappedProducts = _mapper.Map<List<ProductDto>>(products);

            return new ApiResponseDto
            {
                Message = "Productos obtenidos existosamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedProducts
            };
        }
    }
}
