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

        SetUpDefaultRoles(serviceProvider).Wait();
        SetupDefaultUser(serviceProvider).Wait();
    }

    private static async Task SetUpDefaultRoles(IServiceProvider serviceProvider) {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        await roleManager.CreateAsync(new Role { Name = Roles.Admin, User = null! });
        await roleManager.CreateAsync(new Role { Name = Roles.User, User = null! });
    }

    private static async Task SetupDefaultUser(IServiceProvider serviceProvider) {
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        var user = new User {
            Email = DefaultUser.Email,
            UserName = DefaultUser.Email
        };

        await userManager.CreateAsync(user, DefaultUser.Password);
        await userManager.AddToRoleAsync(user, Roles.Admin);
    }
}
