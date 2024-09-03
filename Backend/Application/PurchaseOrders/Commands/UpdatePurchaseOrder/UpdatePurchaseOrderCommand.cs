using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Commands.UpdatePurchaseOrder
{
    public class UpdatePurchaseOrderCommand : IRequest<ApiResponseDto>
    {
        public int Id { get; set; }
        [JsonPropertyName("supplier_id")]
        public int SupplierId { get; set; }
        [JsonPropertyName("delivery_date")]
        public DateTime DeliveryDate { get; set; }
        public List<UpdatePurchaseOrderDetailDto> Details { get; set; }
    }

    public class UpdatePurchaseOrderCommandHandler : IRequestHandler<UpdatePurchaseOrderCommand, ApiResponseDto>
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IPurchaseOrderDetailRepository _purchaseOrderDetailRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<UpdatePurchaseOrderCommand> _validator;
        private readonly IMapper _mapper;

        public UpdatePurchaseOrderCommandHandler(
            IPurchaseOrderRepository purchaseOrderRepository,
            IUnitOfWork unitOfWork,
            IValidator<UpdatePurchaseOrderCommand> validator,
            IMapper mapper
            )
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _unitOfWork = unitOfWork;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(UpdatePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var purchaseOrderEntity = await _purchaseOrderRepository.GetById(request.Id);

            if (purchaseOrderEntity is null)
            {
                return new ApiResponseDto
                {
                    Message = "La orden de compra que quiere actualizar no existe en nuestro sistema.",
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Response = false
                };
            }

            _mapper.Map(request, purchaseOrderEntity);
            await _purchaseOrderRepository.Update(purchaseOrderEntity);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "La orden de compra se actualizo correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = true
            };
        }
    }
}
