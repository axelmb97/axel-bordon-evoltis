﻿using Application.PurchaseOrderDetails.Queries;
using Application.PurchaseOrders.Commands.CreatePurchaseOrder;
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
    }
}
