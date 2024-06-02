using Blog.Services.Implementations;
using Blog.Services.Interfaces;
using Blog.Services.MappingConfiguration;
using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Blog.Services.Extensions;

public static class ServiceCollectionExtensions {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services) {
        return services
             .AddMapster()
             .AddScoped(typeof(IAuthorizationService), typeof(AuthorizationService))
             .AddScoped(typeof(SecurityTokenHandler), typeof(JwtSecurityTokenHandler))
             .AddScoped(typeof(IPostService), typeof(PostService))
             .AddScoped(typeof(ICommentService), typeof(CommentService));
    }

    private static IServiceCollection AddMapster(this IServiceCollection services) {
        return services
            .AddSingleton(
                TypeAdapterConfig.GlobalSettings
                    .AddUserConfiguration()
                    .AddPostConfiguration()
                    .AddCommentConfiguration()
                )
            .AddScoped<IMapper, Mapper>();
    }
}