using Application.Common.Interfaces.Repositories;
using Application.Common.Models;
using Application.Receptions.Dtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Receptions.Queries.GetFilteredReceptions
{
    public class GetFilteredReceptionsQuery : ReceptionFiltersDto, IRequest<ApiResponseDto> { }

    public class GetFilteredReceptionsQueryHandler : IRequestHandler<GetFilteredReceptionsQuery, ApiResponseDto>
    {
        private readonly IReceptionRepository _receptionRepository;
        private readonly IMapper _mapper;

        public GetFilteredReceptionsQueryHandler(IReceptionRepository receptionRepository, IMapper mapper)
        {
            _receptionRepository = receptionRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponseDto> Handle(GetFilteredReceptionsQuery request, CancellationToken cancellationToken)
        {
            var receptions = await _receptionRepository.GetFilteredReceptions(request);
            var mappedReceptions = _mapper.Map<PaginatedReceptionsDto>(receptions);

            return new ApiResponseDto
            {
                Message = "Se han recuperado las recepciones correctamente",
                StatusCode = (int)HttpStatusCode.OK,
                Response = mappedReceptions
            };
        }
    }
}
