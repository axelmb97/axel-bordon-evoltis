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
    public class SupplierRepository : ISupplierRepository
    {
        private readonly InventoryDBContext _dbContext;

        public SupplierRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SupplierEntity>> GetAll()
        {
            return await _dbContext.Suppliers.ToListAsync();
        }
    }
}
