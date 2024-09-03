using Application.PurchaseOrderDetails.Dtos;
using Application.Suppliers.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Dto
{
    public class PurchaseOrderDto
    {
        public int Id { get; set; }
        public SupplierDto? Supplier { get; set; }
        public DateTime DeliveryDate { get; set; }
        public List<PurchaseOrderDetailDto> Details { get; set; }
    }
}
