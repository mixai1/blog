using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Blog.Dal;

public static class DbContextExtension {
    public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, string connectionString) {
        return services
            .AddDbContext<BlogDbContext>(
                (sp, options) => {
                    options.UseNpgsql(connectionString, providerOptions => {
                        providerOptions
                            .CommandTimeout(180)
                            .MigrationsHistoryTable("_migrations");
                    });
                }
            );
    }
}
