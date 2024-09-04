using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.ReceptionDetails.Dtos;
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

namespace Application.Receptions.Commands.UpdateReception
{
    public class UpdateReceptionCommand : IRequest<ApiResponseDto>
    {
        public int Id { get; set; }
        [JsonPropertyName("employee_id")]
        public int EmployeeId { get; set; }
        public List<UpdateReceptionDetailDto> Details { get; set; }
    }

    public class UpdateReceptionCommandHandler : IRequestHandler<UpdateReceptionCommand, ApiResponseDto>
    {

        private readonly IReceptionRepository _receptionRepository;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        private readonly IStockRepository _stockRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateReceptionCommandHandler(
            IReceptionRepository receptionRepository,
            IPurchaseOrderRepository purchaseRepository, 
            IStockRepository stockRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper)
        {
            _receptionRepository = receptionRepository;
            _purchaseRepository = purchaseRepository;
            _stockRepository = stockRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(UpdateReceptionCommand request, CancellationToken cancellationToken)
        {
            var reception = await _receptionRepository.GetReceptionById(request.Id);

            if (reception is null)
            {
                return GetBadRequestResponse("La recepción que quiere actualizar no existe");
            }

            var stocks = await GetStocks(request.Details, reception);

            _mapper.Map(request, reception);
            await _receptionRepository.Update(reception);
            await _stockRepository.Update(stocks["update"]);
            await _stockRepository.InsertStockList(stocks["create"]);
            await _stockRepository.Delete(stocks["delete"]);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "La recepción se actualizó correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = true
            };
        }

        private ApiResponseDto GetBadRequestResponse(string message)
        {
            return new ApiResponseDto
            {
                Message = message,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Response = false
            };
        }

        private async Task<Dictionary<string, List<StockEntity>>> GetStocks(List<UpdateReceptionDetailDto> details, ReceptionEntity reception)
        {
            Dictionary<string, List<StockEntity>> stocks = new Dictionary<string, List<StockEntity>> {
                 { "update", new List<StockEntity>()},
                 { "create", new List<StockEntity>()},
                 { "delete", new List<StockEntity>()}
             };

            List<int> stocksIds = details.Select(d => d.ProductId).ToList();

            var idsStocksToDelete = reception.Details.Where(d => !stocksIds.Contains(d.ProductEntityId)).Select(d => d.ProductEntityId).ToList();
            var stocksToDelete = await _stockRepository.GetStocksByIds(idsStocksToDelete);
            stocks["remove"] = stocksToDelete;


            var existingStocks = await _stockRepository.GetStocksByIds(stocksIds);

            foreach (var stock in existingStocks)
            {
                var lastQuantityAdded = reception.Details.FirstOrDefault(d => d.ProductEntityId.Equals(stock.ProductEntityId))?.QuantityReceived;
                var detail = details.FirstOrDefault(d => d.ProductId.Equals(stock.ProductEntityId));
                stock.Quantity -= (int)lastQuantityAdded;
                stock.Quantity += detail.QuantityReceived;
                stock.ModifiedAt = DateTime.Now;
                stocks["update"].Add(stock);
            }


            foreach (var detail in details)
            {
                if (existingStocks.Find(s => s.ProductEntityId.Equals(detail.ProductId)) is null)
                {

                    var stockEntity = _mapper.Map<StockEntity>(detail);
                    stocks["create"].Add(stockEntity);
                }
            }

            return stocks;
        }
    }
}
