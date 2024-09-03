using Application.Employees.Queries;
using Application.Employees.Queries.GetAllEmployees;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ISender _mediator;

        public EmployeesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees() {
            var result = await _mediator.Send(new GetAllEmployeesQuery());
            return StatusCode(result.StatusCode, result);
        }
    }
}
