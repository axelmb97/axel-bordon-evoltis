using Application.PurchaseOrderDetails.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Commands.CreatePurchaseOrder
{
    public class CreatePurchaseOrderCommandValidator : AbstractValidator<CreatePurchaseOrderCommand>
    {
        public CreatePurchaseOrderCommandValidator()
        {
            RuleFor(d => d.SupplierId).NotNull().GreaterThan(0).WithMessage("El campo supplierId es requerido");
            RuleFor(d => d.DeliveryDate).NotNull().WithMessage("El campo fecha es requerido");
            RuleFor(po => po.Details).NotEmpty().WithMessage("No puedes crear una orden de compra sin detalles");

            RuleForEach(d => d.Details).SetValidator(new CreatePuchaseOrderDetailDtoValidator());
        }
    }

    public class CreatePuchaseOrderDetailDtoValidator : AbstractValidator<CreatePurchaseOrderDetailDto>
    {
        public CreatePuchaseOrderDetailDtoValidator()
        {
            RuleFor(d => d.ProductId).NotNull().WithMessage("El deatlle debe tener un producto relacionado");
            RuleFor(d => d.Quantity)
                .NotNull().WithMessage("La cantidad del detalle es obligatoria")
                .GreaterThan(0).WithMessage("La cantidad pedida no puede ser cero");
        }
    }
}
