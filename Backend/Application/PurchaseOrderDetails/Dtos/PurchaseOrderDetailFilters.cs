using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrderDetails.Dtos
{
    public class PurchaseOrderDetailFilters
    {
        [FromRoute(Name = "purchase_order_id")]
        public int PurchaseOrderId { get; set; }
        [FromQuery(Name = "quantity_greater_than")]
        public int? QuantityGreaterThan { get; set; }
        [FromQuery(Name = "quantity_less_than")]
        public int? QuantityLessThan { get; set; }
        [FromQuery(Name = "price_greater_than")]
        public decimal? PriceGreaterThan { get; set; }
        [FromQuery(Name = "price_less_than")]
        public decimal? PriceLessThan { get; set; }
        [FromQuery(Name = "product_name")]
        public string? ProductName { get; set; }
        [FromQuery(Name = "page")]
        public int Page { get; set; } = 1;
        [FromQuery(Name = "page_size")]
        public int PageSize { get; set; } = 10;
    }
}
