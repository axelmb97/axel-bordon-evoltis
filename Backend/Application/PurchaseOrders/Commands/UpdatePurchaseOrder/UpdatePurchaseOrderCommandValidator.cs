using Application.PurchaseOrderDetails.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Commands.UpdatePurchaseOrder
{
    public class UpdatePurchaseOrderCommandValidator : AbstractValidator<UpdatePurchaseOrderCommand>
    {
        public UpdatePurchaseOrderCommandValidator()
        {
            RuleFor(po => po.Id).NotNull().WithMessage("El id de la orden es requerido");
            RuleFor(d => d.SupplierId).NotNull().WithMessage("El id del proveedor es requerido");
            RuleFor(d => d.DeliveryDate).NotNull().WithMessage("La fecha de llegada es requerido");
            RuleFor(po => po.Details).NotEmpty().WithMessage("No hay detalles en la orden de compra");
            RuleForEach(po => po.Details).SetValidator(new UpdatePurchaseOrderDetailDtoValidator());
        }
    }

    public class UpdatePurchaseOrderDetailDtoValidator : AbstractValidator<UpdatePurchaseOrderDetailDto>
    {
        public UpdatePurchaseOrderDetailDtoValidator()
        {
            RuleFor(d => d.Id).NotNull().WithMessage("El id del detalle es obligatorio");
            RuleFor(d => d.Quantity)
                .NotNull().WithMessage("La cantidad del detalle es obligatorio")
                .GreaterThanOrEqualTo(1).WithMessage($"La cantidad del producto debe ser mayor a cero");
            RuleFor(d => d.PriceByUnit)
                .NotNull().WithMessage("El precio del detalle es obligatorio")
                .GreaterThanOrEqualTo(1).WithMessage($"El precio del producto debe ser mayor a cero");
            RuleFor(d => d.ProductId).NotNull().WithMessage("El id del producto es obligatorio");
        }
    }
}
