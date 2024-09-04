using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stocks.Commands.CreateStock
{
    public class CreateStockCommandValidator : AbstractValidator<CreateStockCommand>
    {
        public CreateStockCommandValidator()
        {
            RuleFor(s => s.Quantity)
               .NotNull().WithMessage("La cantidad es requerida")
               .GreaterThanOrEqualTo(1).WithMessage("La cantidad debe ser mayor a cero");

            RuleFor(s => s.ProductId).NotNull().WithMessage("El id del producto es requerido");
        }
    }
}
