using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.PurchaseOrderDetails.Dtos;
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
    public class PurchaseOrderDetailRepository : IPurchaseOrderDetailRepository
    {
        private readonly InventoryDBContext _dbContext;

        public PurchaseOrderDetailRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Pagination<PurchaseOrderDetailEntity>> GetFilteredDetails(PurchaseOrderDetailFilters filters)
        {
            var query = GetQuery(filters);
            var totalItems = await query.CountAsync();
            List<PurchaseOrderDetailEntity> items = await FilterDetails(query, filters);
            return new Pagination<PurchaseOrderDetailEntity>(items, totalItems, filters.Page, filters.PageSize);
        }

        private IQueryable<PurchaseOrderDetailEntity> GetQuery(PurchaseOrderDetailFilters filters) { 
            var query = _dbContext.PurchaseOrderDetails.AsQueryable();
            query = query.Where(d => d.PurchaseOrderEntityId.Equals(filters.PurchaseOrderId)).Include(d => d.Product);

            if (filters.QuantityGreaterThan is not null && filters.QuantityLessThan is not null)
            {
                query = query.Where(d => d.Quantity >= filters.QuantityGreaterThan && d.Quantity < filters.QuantityLessThan);
            }

            if (filters.PriceGreaterThan is not null && filters.PriceLessThan is not null)
            {
                query = query.Where(d => d.PriceByUnit >= filters.PriceGreaterThan && d.PriceByUnit < filters.PriceLessThan);
            }

            if (filters.ProductName is not null && filters.ProductName.Length > 0)
            {
                query = query.Where(d => d.Product.Name.ToLower().Contains(filters.ProductName.ToLower()));
            }

            return query;
        }

        private async Task<List<PurchaseOrderDetailEntity>> FilterDetails(IQueryable<PurchaseOrderDetailEntity> query, PurchaseOrderDetailFilters filters) { 
            int skip = (filters.Page - 1) * filters.PageSize;
            return await query.Skip(skip).Take(filters.PageSize).ToListAsync();
        }
    }
}
