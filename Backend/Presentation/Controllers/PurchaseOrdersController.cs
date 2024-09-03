using Application.PurchaseOrderDetails.Queries;
using Application.PurchaseOrders.Commands.CreatePurchaseOrder;
using Application.PurchaseOrders.Commands.DeletePurchaseOrder;
using Application.PurchaseOrders.Commands.UpdatePurchaseOrder;
using Application.PurchaseOrders.Queries.GetFilteredPurchaseOrders;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/purchase-orders")]
    [ApiController]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly ISender _mediator;

        public PurchaseOrdersController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetPurchasesOrders([FromQuery] GetFilteredPurchaseOrdersQuery query)
        {
            var result = await _mediator.Send(query);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("{purchase_order_id}/details")]
        public async Task<IActionResult> GetPurchaseOrderDetails([FromRoute] GetFilteredPurchaseOrderDetailsQuery query)
        {
            var result = await _mediator.Send(query);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<IActionResult> PostPurchaseOrder([FromBody] CreatePurchaseOrderCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut]
        public async Task<IActionResult> PutPurchaseOrder([FromBody] UpdatePurchaseOrderCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrder([FromRoute] DeletePurchaseOrderCommand command)
        {
            var result = await _mediator.Send(command);
            return StatusCode(result.StatusCode, result);
        }
    }
}
