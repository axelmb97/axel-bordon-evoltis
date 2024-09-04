using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Stocks.Queries.GetFilteredStocks;
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
    public class StockRepository : IStockRepository
    {
        private readonly InventoryDBContext _dbContext;

        public StockRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Delete(List<StockEntity> stock)
        {
            if (stock.Count == 0) return;
            _dbContext.Stocks.RemoveRange(stock);
        }

        public async Task<Pagination<StockEntity>> GetFilteredStock(GetFilteredStocksQuery filters)
        {
            var query = GetQuery(filters);
            var totalItems = await query.CountAsync();
            List<StockEntity> items = await FilterStocks(query, filters);
            return new Pagination<StockEntity>(items, totalItems, filters.Page, filters.PageSize);
        }
        private IQueryable<StockEntity> GetQuery(GetFilteredStocksQuery filters)
        {
            var query = _dbContext.Stocks.AsQueryable();
            query = query.Include(d => d.Product);

            if (filters.QuantityGreaterThan is not null && filters.QuantityLessThan is not null)
            {
                query = query.Where(d => d.Quantity >= filters.QuantityGreaterThan && d.Quantity < filters.QuantityLessThan);
            }

            if (filters.ProductName is not null && filters.ProductName.Length > 0)
            {
                query = query.Where(d => d.Product.Name.ToLower().Contains(filters.ProductName.ToLower()));
            }
            return query;
        }

        private async Task<List<StockEntity>> FilterStocks(IQueryable<StockEntity> query, GetFilteredStocksQuery filters)
        {
            int skip = (filters.Page - 1) * filters.PageSize;
            return await query.Skip(skip).Take(filters.PageSize).ToListAsync();
        }
        public async Task<StockEntity> GetStockById(int id)
        {
            return await _dbContext.Stocks.FirstOrDefaultAsync(s => s.ProductEntityId.Equals(id));
        }

        public async Task<List<StockEntity>> GetStocksByIds(List<int> ids)
        {
            return await _dbContext.Stocks.Where(s => ids.Contains(s.ProductEntityId)).ToListAsync();
        }

        public async Task Insert(StockEntity stock)
        {
            await _dbContext.Stocks.AddAsync(stock);
        }

        public async Task InsertStockList(List<StockEntity> stock)
        {
            if (stock.Count == 0) return;
            await _dbContext.Stocks.AddRangeAsync(stock);
        }

        public async Task Update(List<StockEntity> stock)
        {
            if (stock.Count == 0) return;
            _dbContext.Stocks.UpdateRange(stock);
        }
    }
}
