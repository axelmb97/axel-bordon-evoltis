using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Dto
{
    public class PurchaseOrderFiltersDto
    {
        [FromQuery(Name = "business_name")]
        public string? BusinessName { get; set; }
        [FromQuery(Name = "from")]
        public DateTime? From { get; set; }
        [FromQuery(Name = "to")]
        public DateTime? To { get; set; }
        [FromQuery(Name = "page")]
        public int Page { get; set; } = 1;
        [FromQuery(Name = "page_size")]
        public int PageSize { get; set; } = 10;
    }
}
