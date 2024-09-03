using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class StockEntity : BaseEntity
    {
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
        public int ProductEntityId { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
