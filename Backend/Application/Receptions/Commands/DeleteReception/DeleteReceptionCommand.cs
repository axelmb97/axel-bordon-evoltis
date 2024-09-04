using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Receptions.Commands.DeleteReception
{
    public class DeleteReceptionCommand : IRequest<ApiResponseDto>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }

    public class DeleteReceptionCommandHandler : IRequestHandler<DeleteReceptionCommand, ApiResponseDto>
    {
        private readonly IReceptionRepository _receptionRepository;
        private readonly IStockRepository _stockRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeleteReceptionCommandHandler(
            IReceptionRepository receptionRepository, 
            IStockRepository stockRepository, 
            IUnitOfWork unitOfWork)
        {
            _receptionRepository = receptionRepository;
            _stockRepository = stockRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponseDto> Handle(DeleteReceptionCommand request, CancellationToken cancellationToken)
        {
            var reception = await _receptionRepository.GetReceptionById(request.Id);

            if (reception is null)
            {
                return new ApiResponseDto
                {
                    Message = "No puede eliminar una recepción que no existe",
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Response = false
                };
            }

            var stocksIds = reception.Details.Select(d => d.ProductEntityId).ToList();
            var stocksToUpdate = await GetStocks(stocksIds);
            UpdateStocksQuantities(stocksToUpdate, reception.Details);

            await _stockRepository.Update(stocksToUpdate);
            await _receptionRepository.Delete(reception);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "Se ha eliminado la orden de recepción correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = true
            };
        }

        private async Task<List<StockEntity>> GetStocks(List<int> ids)
        {
            return await _stockRepository.GetStocksByIds(ids);
        }

        private void UpdateStocksQuantities(List<StockEntity> stocks, List<ReceptionDetailEntity> details)
        {
            foreach (var stock in stocks)
            {
                var quantity = details.Find(d => d.ProductEntityId.Equals(stock.ProductEntityId))?.QuantityReceived;
                stock.Quantity -= (int)quantity;
                stock.ModifiedAt = DateTime.Now;
            }
        }
    }
}
