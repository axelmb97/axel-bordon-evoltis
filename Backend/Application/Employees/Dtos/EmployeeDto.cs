using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Employees.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("last_name")]
        public string Lastname { get; set; }
        [JsonPropertyName("phone_number")]
        public string PhoneNumber { get; set; }
    }
}
