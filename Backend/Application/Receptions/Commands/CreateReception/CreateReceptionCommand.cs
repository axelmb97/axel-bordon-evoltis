using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.ReceptionDetails.Dtos;
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

namespace Application.Receptions.Commands.CreateReception
{
    public class CreateReceptionCommand : IRequest<ApiResponseDto>
    {
        [JsonPropertyName("purchase_order_id")]
        public int PurchaseOrderId { get; set; }
        [JsonPropertyName("employee_id")]
        public int EmployeeId { get; set; }
        public List<CreateReceptionDetailDto> Details { get; set; }
    }

    public class CreateReceptionCommandHandler : IRequestHandler<CreateReceptionCommand, ApiResponseDto>
    {
        private readonly IReceptionRepository _receptionRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IStockRepository _stockRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateReceptionCommandHandler(
            IReceptionRepository receptionRepository, 
            IPurchaseOrderRepository purchaseOrderRepository, 
            IEmployeeRepository employeeRepository, 
            IStockRepository stockRepository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper)
        {
            _receptionRepository = receptionRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _employeeRepository = employeeRepository;
            _stockRepository = stockRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(CreateReceptionCommand request, CancellationToken cancellationToken)
        {
            var purchaseOrder = await _purchaseOrderRepository.GetById(request.PurchaseOrderId);

            if (purchaseOrder is null)
            {
                return GetBadRequestResponse("No existe la orden de compra que quiere recepcionar");
            }

            if (purchaseOrder.Reception is not null)
            {
                return GetBadRequestResponse("La orden de compra seleccionada ya fue recepcionada");
            }

            var employee = await _employeeRepository.GetById(request.EmployeeId);

            if (employee is null)
            {
                return GetBadRequestResponse("No existe el empleado seleccionado para recepcionar");
            }

            var reception = _mapper.Map<ReceptionEntity>(request);
            var stocks = await GetStocks(request.Details);

            await _receptionRepository.Insert(reception);
            await _stockRepository.Update(stocks["update"]);
            await _stockRepository.InsertStockList(stocks["create"]);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "Se ha creado la recepción correctamente",
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

        private async Task<Dictionary<string, List<StockEntity>>> GetStocks(List<CreateReceptionDetailDto> details)
        {
            Dictionary<string, List<StockEntity>> stocks = new Dictionary<string, List<StockEntity>> {
                 { "update", new List<StockEntity>()},
                 { "create", new List<StockEntity>()}
             };
            List<int> stocksIds = details.Select(d => d.ProductId).ToList();
            var existingStocks = await _stockRepository.GetStocksByIds(stocksIds);

            foreach (var stock in existingStocks)
            {
                var detail = details.FirstOrDefault(d => d.ProductId.Equals(stock.ProductEntityId));
                stock.Quantity += detail.QuantityReceived;
                stock.ModifiedAt = DateTime.Now;
                details.Remove(detail);
                stocks["update"].Add(stock);
            }

            foreach (var detail in details)
            {
                var stockEntity = _mapper.Map<StockEntity>(detail);
                stocks["create"].Add(stockEntity);
            }

            return stocks;
        }
    }
}
