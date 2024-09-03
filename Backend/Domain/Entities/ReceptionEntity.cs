using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ReceptionEntity : BaseEntity
    {
        public int PurchaseOrderEntityId { get; set; }
        public virtual PurchaseOrderEntity Purchase { get; set; }
        public int EmployeeEntityId { get; set; }
        public virtual EmployeeEntity Employee { get; set; }
        public virtual List<ReceptionDetailEntity> Details { get; set; }
    }
}
