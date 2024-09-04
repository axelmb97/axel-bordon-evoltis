using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Stocks.Dtos
{
    public class PaginatedStockDto
    {
        public List<StockDto> Items { get; set; }
        [JsonPropertyName("total_items")]
        public int TotalItems { get; set; }
        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }
        [JsonPropertyName("has_next_page")]
        public bool HasNextPage { get; set; }
    }
}
