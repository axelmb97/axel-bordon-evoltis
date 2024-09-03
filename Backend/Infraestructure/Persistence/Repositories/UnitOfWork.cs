using Application.Common.Interfaces.Repositories;
using Infraestructure.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly InventoryDBContext _dbContext;

        public UnitOfWork(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
