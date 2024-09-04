using Application.ReceptionDetails.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Receptions.Commands.CreateReception
{
    public class CreateReceptionCommandValidator : AbstractValidator<CreateReceptionCommand>
    {
        public CreateReceptionCommandValidator()
        {
            RuleFor(r => r.PurchaseOrderId).NotNull().WithMessage("El id de la orden de compra es requerido");
            RuleFor(r => r.EmployeeId).NotNull().WithMessage("El id del empleado el requerido");
            RuleFor(r => r.Details).NotEmpty().WithMessage("Los detalles de la recepcion son obligatorios");

            RuleForEach(r => r.Details).SetValidator(new CreateReceptionDetailDtoValidator());
        }
    }

    public class CreateReceptionDetailDtoValidator : AbstractValidator<CreateReceptionDetailDto>
    {
        public CreateReceptionDetailDtoValidator()
        {
            RuleFor(d => d.QuantityReceived)
                .NotNull().WithMessage("La cantidad recibida es requerida")
                .GreaterThanOrEqualTo(0).WithMessage("La cantidad recibida no puede ser menor a cero");

            RuleFor(d => d.ProductId).NotNull().WithMessage("El id del producto es requerido");
        }
    }
}
