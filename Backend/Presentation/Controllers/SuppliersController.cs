using Application.Employees.Queries.GetAllEmployees;
using Application.Suppliers.Queries.GetAllSuppliers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/suppliers")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISender _mediator;

        public SuppliersController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            var result = await _mediator.Send(new GetAllSuppliersQuery());
            return StatusCode(result.StatusCode, result);
        }
    }
}
