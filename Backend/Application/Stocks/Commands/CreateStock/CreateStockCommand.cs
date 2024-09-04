using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Stocks.Commands.CreateStock
{
    public class CreateStockCommand : IRequest<ApiResponseDto>
    {
        public int Quantity { get; set; }
        [JsonPropertyName("product_id")]
        public int ProductId { get; set; }
    }

    public class CreateStockCommandHandler : IRequestHandler<CreateStockCommand, ApiResponseDto>
    {
        private readonly IStockRepository _stockRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateStockCommandHandler(
            IStockRepository stockRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper
            )
        {
            _stockRepository = stockRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(CreateStockCommand request, CancellationToken cancellationToken)
        {
            var stock = await _stockRepository.GetStockById(request.ProductId);

            if (stock is not null)
            {
                return new ApiResponseDto
                {
                    Message = "Ya existe un stock creado con exte producto",
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Response = false
                };
            }

            var stockEntity = _mapper.Map<StockEntity>(request);
            await _stockRepository.Insert(stockEntity);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "Stock registrado con exito",
                StatusCode = (int)HttpStatusCode.OK,
                Response = true
            };
        }
    }
}
