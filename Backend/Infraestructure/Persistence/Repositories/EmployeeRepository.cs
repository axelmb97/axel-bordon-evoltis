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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly InventoryDBContext _dbContext;

        public EmployeeRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<EmployeeEntity>> GetAll()
        {
            return await _dbContext.Employees.ToListAsync();
        }
    }
}
