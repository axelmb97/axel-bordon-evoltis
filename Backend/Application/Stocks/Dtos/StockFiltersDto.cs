using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stocks.Dtos
{
    public class StockFiltersDto
    {
        [FromQuery(Name = "product_name")]
        public string? ProductName { get; set; }
        [FromQuery(Name = "quantity_greater_than")]
        public int? QuantityGreaterThan { get; set; }
        [FromQuery(Name = "quantity_less_than")]
        public int? QuantityLessThan { get; set; }
        [FromQuery(Name = "page")]
        public int Page { get; set; } = 1;
        [FromQuery(Name = "page_size")]
        public int PageSize { get; set; } = 10;
    }
}
