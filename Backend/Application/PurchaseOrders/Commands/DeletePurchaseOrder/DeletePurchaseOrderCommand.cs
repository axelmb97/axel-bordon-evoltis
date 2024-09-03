using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Commands.DeletePurchaseOrder
{
    public class DeletePurchaseOrderCommand :  IRequest<ApiResponseDto>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }

    public class DeletePurchaseOrderCommandHandler : IRequestHandler<DeletePurchaseOrderCommand, ApiResponseDto>
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeletePurchaseOrderCommandHandler(
            IPurchaseOrderRepository purchaseOrderRepository, 
            IUnitOfWork unitOfWork)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<ApiResponseDto> Handle(DeletePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var purchaseOrder = await _purchaseOrderRepository.GetById(request.Id);

            if (purchaseOrder is null)
            {
                return new ApiResponseDto
                {
                    Message = "No existe la orden de compra que se quiere borrar",
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Response = false
                };
            }

            if (purchaseOrder.Reception is not null)
            {
                return new ApiResponseDto
                {
                    Message = "No puede borrar una orden de compra que ya ha sido recepcionada",
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Response = false
                };
            }

            await _purchaseOrderRepository.Delete(purchaseOrder);
            await _unitOfWork.SaveChangesAsync();

            return new ApiResponseDto
            {
                Message = "Se borro la orden de compra exitosamente",
                StatusCode = (int)HttpStatusCode.OK
            };
        }
    }
}
