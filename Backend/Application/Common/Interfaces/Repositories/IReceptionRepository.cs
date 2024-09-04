using Application.Common.Models;
using Application.Receptions.Queries.GetFilteredReceptions;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Repositories
{
    public interface IReceptioRepository
    {
        Task<ReceptionEntity> GetReceptionById(int id);
        Task<Pagination<ReceptionEntity>> GetFilteredReceptions(GetFilteredReceptionsQuery filters);
        Task Insert(ReceptionEntity reception);
        Task Update(ReceptionEntity reception);
        Task Delete(ReceptionEntity reception);
    }
}
