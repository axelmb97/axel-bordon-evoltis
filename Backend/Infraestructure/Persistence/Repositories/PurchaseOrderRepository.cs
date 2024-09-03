using Application.Common.Interfaces.Repositories;
using Domain.Entities;
using Infraestructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Persistence.Repositories
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly InventoryDBContext _dbContext;

        public PurchaseOrderRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Delete(PurchaseOrderEntity purchaseOrder)
        {
            _dbContext.PurchaseOrders.Remove(purchaseOrder);
        }

        public async Task<PurchaseOrderEntity> GetById(int id)
        {
            return await _dbContext.PurchaseOrders.Include(po => po.Details).Include(p => p.Reception).FirstOrDefaultAsync(po => po.Id.Equals(id));
        }

        public async Task Insert(PurchaseOrderEntity purchaseOrder)
        {
            await _dbContext.PurchaseOrders.AddAsync(purchaseOrder);
        }

        public async Task Update(PurchaseOrderEntity purchaseOrder)
        {
            _dbContext.PurchaseOrders.Update(purchaseOrder);
        }
    }
}
