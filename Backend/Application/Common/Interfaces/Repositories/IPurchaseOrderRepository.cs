using Application.Common.Models;
using Application.PurchaseOrders.Dto;
using Application.PurchaseOrders.Queries.GetFilteredPurchaseOrders;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Repositories
{
    public interface IPurchaseOrderRepository
    {
        Task<PurchaseOrderEntity> GetById(int id);
        Task<Pagination<PurchaseOrderEntity>> GetFilteredDeliveries(PurchaseOrderFiltersDto filters);
        Task Insert(PurchaseOrderEntity purchaseOrder);
        Task Update(PurchaseOrderEntity purchaseOrder);
        Task Delete(PurchaseOrderEntity purchaseOrder);
    }
}
