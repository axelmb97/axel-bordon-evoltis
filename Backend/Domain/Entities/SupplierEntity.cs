using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class SupplierEntity : BaseEntity
    {
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }

        public virtual List<PurchaseOrderEntity> Orders { get; set; }
    }
}
