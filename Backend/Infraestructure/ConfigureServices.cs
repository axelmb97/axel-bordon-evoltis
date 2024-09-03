using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfraestructureServices(this IServiceCollection services) {


            return services;
        }
    }
}
