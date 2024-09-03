using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PurchaseOrderEntity : BaseEntity
    {
        public int SupplierEntityId { get; set; }
        public virtual SupplierEntity Supplier { get; set; }
        public DateTime DeliveryDate { get; set; }
        public virtual List<PurchaseOrderDetailEntity> Details { get; set; }
        public virtual ReceptionEntity? Reception { get; set; }
    }
}
