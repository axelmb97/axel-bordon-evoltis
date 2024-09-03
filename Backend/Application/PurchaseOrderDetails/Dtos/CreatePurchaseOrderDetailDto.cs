using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.PurchaseOrderDetails.Dtos
{
    public class CreatePurchaseOrderDetailDto
    {
        public int Quantity { get; set; }
        [JsonPropertyName("product_id")]
        public int ProductId { get; set; }
        [JsonPropertyName("price_by_unit")]
        public decimal PriceByUnit { get; set; }
    }
}
