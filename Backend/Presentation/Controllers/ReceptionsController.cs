using Application.Receptions.Commands.CreateReception;
using Application.Receptions.Commands.DeleteReception;
using Application.Receptions.Commands.UpdateReception;
using Application.Receptions.Queries.GetFilteredReceptions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/receptions")]
    [ApiController]
    public class ReceptionsController : ControllerBase
    {
        private readonly ISender _mediator;

        public ReceptionsController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredReceptions([FromQuery] GetFilteredReceptionsQuery query)
        {
            var result = await _mediator.Send(query);
            return StatusCode(result.StatusCode, result);
        }


        [HttpPost]
        public async Task<IActionResult> PostReception([FromBody] CreateReceptionCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut]
        public async Task<IActionResult> PutReception([FromBody] UpdateReceptionCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReception([FromRoute] DeleteReceptionCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }
    }
}
