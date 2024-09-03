using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ReceptionDetailEntity : BaseEntity
    {
        public int QuantityReceived { get; set; }
        public string? Description { get; set; }
        public int ReceptionEntityId { get; set; }
        public virtual ReceptionEntity Reception { get; set; }
        public int ProductEntityId { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
