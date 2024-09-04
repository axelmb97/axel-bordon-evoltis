using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Receptions.Queries.GetFilteredReceptions;
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
    public class ReceptionRepository : IReceptionRepository
    {
        public readonly InventoryDBContext _dbContext;

        public ReceptionRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Pagination<ReceptionEntity>> GetFilteredReceptions(GetFilteredReceptionsQuery filters)
        {
            var query = GetQuery(filters);
            int totalItems = await query.CountAsync();
            List<ReceptionEntity> items = await FilterReceptions(query, filters);
            return new Pagination<ReceptionEntity>(items, totalItems, filters.Page, filters.PageSize);
        }

        private IQueryable<ReceptionEntity> GetQuery(GetFilteredReceptionsQuery filters)
        {
            var query = _dbContext.Receptions.AsQueryable();
            query = query.Include(r => r.Employee);
            if (filters.EmployeeId is not null && filters.EmployeeId > 0)
            {
                query = query.Where(r => r.EmployeeEntityId.Equals(filters.EmployeeId));
            }

            if (filters.From is not null && filters.To is not null)
            {
                query = query.Where(r => r.CreatedAt >= filters.From && r.CreatedAt <= filters.To);
            }
            else
            {
                if (filters.From is not null || filters.To is not null)
                {
                    query = filters.From is not null
                        ? query.Where(r => r.CreatedAt == filters.From)
                        : query.Where(r => r.CreatedAt == filters.To);
                }
            }

            return query;
        }

        private async Task<List<ReceptionEntity>> FilterReceptions(IQueryable<ReceptionEntity> query, GetFilteredReceptionsQuery filters)
        {
            int skip = (filters.Page - 1) * filters.PageSize;
            return await query.Skip(skip).Take(filters.PageSize).ToListAsync();
        }

        public async Task Insert(ReceptionEntity reception)
        {
            await _dbContext.Receptions.AddAsync(reception);
        }

        public async Task Update(ReceptionEntity reception)
        {
            _dbContext.Receptions.Update(reception);
        }

        public async Task<ReceptionEntity> GetReceptionById(int id)
        {
            return await _dbContext.Receptions.Include(r => r.Details).FirstOrDefaultAsync(r => r.Id.Equals(id));
        }

        public async Task Delete(ReceptionEntity reception)
        {
            _dbContext.Receptions.Remove(reception);
        }
    }
}
