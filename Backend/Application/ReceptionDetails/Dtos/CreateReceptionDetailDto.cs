﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.ReceptionDetails.Dtos
{
    public class CreateReceptionDetailDto
    {
        [JsonPropertyName("product_id")]
        public int ProductId { get; set; }
        [JsonPropertyName("quantity_received")]
        public int QuantityReceived { get; set; }
        public string? Description { get; set; }
    }
}
