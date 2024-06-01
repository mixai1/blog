using Blog.Core.Constants;
using Blog.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

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

    public static void Seed(this BlogDbContext context, IServiceProvider serviceProvider) {
        if (context.Database.GetPendingMigrations().Any() || !context.Database.GetMigrations().Any()) {
            return;
        }

        if (context.Set<User>().Any(x => x.Email == DefaultUser.Email)) {
            return;
        }

        SetupDefaultUser(serviceProvider).Wait();
    }

    private static async Task SetupDefaultUser(IServiceProvider serviceProvider) {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();

        var user = new User {
            Email = DefaultUser.Email,
            UserName = DefaultUser.Email
        };

        await userManager.CreateAsync(user, DefaultUser.Password);
        await roleManager.CreateAsync(new Role { Name = Roles.Admin });
        await roleManager.CreateAsync(new Role { Name = Roles.User });
        await userManager.AddToRoleAsync(user, Roles.Admin);
    }
}
