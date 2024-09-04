using Application.Common.Models;
using Application.Stocks.Queries.GetFilteredStocks;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Repositories
{
    public interface IStockRepository
    {
        Task<StockEntity> GetStockById(int id);
        Task<List<StockEntity>> GetStocksByIds(List<int> ids);
        Task<Pagination<StockEntity>> GetFilteredStock(GetFilteredStocksQuery filters);
        Task InsertStockList(List<StockEntity> stock);
        Task Insert(StockEntity stock);
        Task Update(List<StockEntity> stock);
        Task Delete(List<StockEntity> stock);
    }
}
