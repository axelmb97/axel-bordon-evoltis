using Application.Common.Exceptions;
using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Behaviours
{
    public class UnhandledExceptionBehaviour<TRquest, TResponse> : IPipelineBehavior<TRquest, TResponse>
        where TResponse : notnull
    {
        public async Task<TResponse> Handle(TRquest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            try
            {
                return await next();
            }
            catch (ValidationException ex)
            {
                var errors = String.Join(" | ", ex.Errors.Values.SelectMany(arrays => arrays));
                return (TResponse)(object)GetValidationError(errors);
            }
            catch (Exception ex)
            {
                return (TResponse)(object)GetInternalServerError();
            }
        }
        private ApiResponseDto GetValidationError(string message)
        {
            return new ApiResponseDto
            {
                Message = message,
                StatusCode = (int)HttpStatusCode.BadRequest
            };
        }
        private ApiResponseDto GetInternalServerError()
        {
            return new ApiResponseDto
            {
                Message = "Ocurrio un error inesperado, intente más tarde.",
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
        }
    }
}
