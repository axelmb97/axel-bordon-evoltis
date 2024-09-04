using Application.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.ReceptionDetails.Dtos
{
    public class ReceptionDetailDto
    {
        public int Id { get; set; }
        [JsonPropertyName("quantity_recevied")]
        public int QuantityReceived { get; set; }
        public string? Description { get; set; }
        public ProductDto Product { get; set; }
    }
}
