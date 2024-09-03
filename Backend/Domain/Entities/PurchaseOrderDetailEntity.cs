using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PurchaseOrderDetailEntity : BaseEntity
    {
        public int PurchaseOrderEntityId { get; set; }
        public virtual PurchaseOrderEntity Purchase { get; set; }
        public int Quantity { get; set; }
        public decimal PriceByUnit { get; set; }
        public int ProductEntityId { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
