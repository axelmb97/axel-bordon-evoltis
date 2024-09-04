using Application.Employees.Dtos;
using Application.ReceptionDetails.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Receptions.Dtos
{
    public class ReceptionDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public EmployeeDto Employee { get; set; }
        public List<ReceptionDetailDto> Details { get; set; }
    }
}
