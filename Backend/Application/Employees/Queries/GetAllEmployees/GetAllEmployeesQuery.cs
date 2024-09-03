using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Employees.Dtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Employees.Queries
{
    public class GetAllEmployeesQuery : IRequest<ApiResponseDto>{ }

    public class GetAllEmployeesQueryHandler : IRequestHandler<GetAllEmployeesQuery, ApiResponseDto>
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public GetAllEmployeesQueryHandler(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetAllEmployeesQuery request, CancellationToken cancellationToken)
        {
            var employeesEntities = await _employeeRepository.GetAll();
            var mappedEmployees = _mapper.Map<List<EmployeeDto>>(employeesEntities);

            return new ApiResponseDto
            {
                Message = "Empleados obtenidos existosamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedEmployees
            };
        }
    }
}
