using Blog.Services.Implementations;
using Blog.Services.Interfaces;
using Blog.Services.MappingConfiguration;
using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Services.Extensions;

public static class ServiceCollectionExtensions {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services) {
        return services
             .AddMapster()
             .AddScoped<IAuthorizationService, AuthorizationService>();
    }

    private static IServiceCollection AddMapster(this IServiceCollection services) {
        return services
            .AddSingleton(TypeAdapterConfig.GlobalSettings.AddUserConfiguration())
            .AddScoped<IMapper, Mapper>();
    }
}