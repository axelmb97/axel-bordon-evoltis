using Application.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stocks.Dtos
{
    public class StockDto
    {
        public int Quantity { get; set; }
        public ProductDto Product { get; set; }
    }
}
