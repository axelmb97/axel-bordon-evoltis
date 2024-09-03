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
    public class ProductRepository : IProductRepository
    {
        private readonly InventoryDBContext _dbContext;

        public ProductRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ProductEntity>> GetAll()
        {
            return await _dbContext.Products.ToListAsync();
        }
    }
}
