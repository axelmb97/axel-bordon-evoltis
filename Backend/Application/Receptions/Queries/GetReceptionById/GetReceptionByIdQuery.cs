using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Receptions.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Receptions.Queries.GetReceptionById
{
    public class GetReceptionByIdQuery : IRequest<ApiResponseDto>
    {
        [FromRoute(Name = "id")]
        public int Id { get; set; }
    }

    public class GetReceptionByIdQueryHandler : IRequestHandler<GetReceptionByIdQuery, ApiResponseDto>
    {
        private readonly IReceptionRepository _receptionRepository;
        private readonly IMapper _mapper;

        public GetReceptionByIdQueryHandler(IReceptionRepository receptionRepository, IMapper mapper)
        {
            _receptionRepository = receptionRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetReceptionByIdQuery request, CancellationToken cancellationToken)
        {
            var reception = await _receptionRepository.GetReceptionById(request.Id);

            if (reception is null) {
                return new ApiResponseDto { 
                    Message = "No se encontro la recepción que esta buscando",
                    StatusCode = (int) HttpStatusCode.NotFound,
                    Response = null
                };
            }

            var receptionMapped = _mapper.Map<ReceptionDto>(reception);

            return new ApiResponseDto { 
                Message = "Se recupero al recepción correctamente",
                StatusCode = (int) HttpStatusCode.OK,
                Response = receptionMapped
            };
        }
    }
}
