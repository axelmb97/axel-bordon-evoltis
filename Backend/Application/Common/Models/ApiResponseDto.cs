using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class ApiResponseDto
    {
        public string Message { get; set; }
        public object Response { get; set; } = null;

        [JsonPropertyName("status_code")]
        public int StatusCode { get; set; }
    }
}
