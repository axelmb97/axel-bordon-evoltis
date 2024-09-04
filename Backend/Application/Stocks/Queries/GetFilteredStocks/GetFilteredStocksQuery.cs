using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Stocks.Dtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stocks.Queries.GetFilteredStocks
{
    public class GetFilteredStocksQuery : StockFiltersDto, IRequest<ApiResponseDto> { }

    public class GetFilteredStocksQueryHandler : IRequestHandler<GetFilteredStocksQuery, ApiResponseDto>
    {
        private readonly IStockRepository _stockRepository;
        private readonly IMapper _mapper;

        public GetFilteredStocksQueryHandler(IStockRepository stockRepository, IMapper mapper)
        {
            _stockRepository = stockRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetFilteredStocksQuery request, CancellationToken cancellationToken)
        {
            var stocks = await _stockRepository.GetFilteredStock(request);
            var mappedStocks = _mapper.Map<PaginatedStockDto>(stocks);

            return new ApiResponseDto
            {
                Message = "Se recuperaron los stocks correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedStocks
            };
        }
    }
}
