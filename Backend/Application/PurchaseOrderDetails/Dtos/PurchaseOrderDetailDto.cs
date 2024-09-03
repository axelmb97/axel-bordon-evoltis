using Application.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.PurchaseOrderDetails.Dtos
{
    public class PurchaseOrderDetailDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        [JsonPropertyName("price_by_unit")]
        public decimal PriceByUnit { get; set; }
        public ProductDto Product { get; set; }
    }
}
