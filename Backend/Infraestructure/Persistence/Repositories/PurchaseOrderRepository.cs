using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrders.Dto;
using Application.PurchaseOrders.Queries.GetFilteredPurchaseOrders;
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
            return await _dbContext.PurchaseOrders.Include(po => po.Details).ThenInclude(d => d.Product).Include(p => p.Supplier).Include(p => p.Reception).FirstOrDefaultAsync(po => po.Id.Equals(id));
        }

        public async Task<Pagination<PurchaseOrderEntity>> GetFilteredDeliveries(PurchaseOrderFiltersDto filters)
        {
            var query = GetQuery(filters);
            int totalItems = await query.CountAsync();
            List<PurchaseOrderEntity> items = await FilterPurchaseOrders(query, filters);
            return new Pagination<PurchaseOrderEntity>(items, totalItems, filters.Page, filters.PageSize);
        }

        private IQueryable<PurchaseOrderEntity> GetQuery(PurchaseOrderFiltersDto filters)
        {
            var query = _dbContext.PurchaseOrders.AsQueryable();
            query = query.Include(d => d.Supplier).Where(p => p.Reception == null);


            if (filters.BusinessName is not null && filters.BusinessName.Length > 0)
            {
                query = query.Where(po => po.Supplier.BusinessName.ToLower().Contains(filters.BusinessName.ToLower()));
            }

            if (filters.From is not null && filters.To is not null)
            {
                query = query.Where(po => po.DeliveryDate >= filters.From && po.DeliveryDate <= filters.To);
            }
            else
            {
                if (!(filters.From is null && filters.To is null))
                {
                    query = filters.From is not null
                        ? query.Where(po => po.DeliveryDate == filters.From)
                        : query.Where(po => po.DeliveryDate == filters.To);
                }
            }

            return query;
        }

        private async Task<List<PurchaseOrderEntity>> FilterPurchaseOrders(IQueryable<PurchaseOrderEntity> query, PurchaseOrderFiltersDto filters)
        {
            int skip = (filters.Page - 1) * filters.PageSize;
            return await query.Skip(skip).Take(filters.PageSize).ToListAsync();
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
