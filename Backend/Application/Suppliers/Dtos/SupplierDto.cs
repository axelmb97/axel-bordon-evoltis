using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Suppliers.Dtos
{
    public class SupplierDto
    {
        public int Id { get; set; }
        [JsonPropertyName("business_name")]
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
