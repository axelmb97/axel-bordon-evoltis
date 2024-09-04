using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces.Repositories
{
    public interface IEmployeeRepository
    {
        Task<EmployeeEntity> GetById(int id);
        Task<List<EmployeeEntity>> GetAll();
    }
}
