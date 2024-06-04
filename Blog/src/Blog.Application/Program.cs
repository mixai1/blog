using System.Text;
using System;
using System.Text.Json.Serialization;
using Blog.Application.Filters;
using Blog.Dal;
using Blog.Entities;
using Blog.Services.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Blog.Core.Constants;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;

namespace Blog.Application;

public class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services
            .AddResponseCompression()
            .AddResponseCaching();

        builder.Services
            .AddApplicationServices();
        builder.Services
            .AddHttpContextAccessor()
            .AddTransient<IPrincipal>(x => x?.GetRequiredService<IHttpContextAccessor>().HttpContext?.User!);
        builder.Services
            .AddControllers(options => {
                options.Filters.Add(typeof(ExceptionFilter));
            })
            .ConfigureApiBehaviorOptions(options => {
                options.InvalidModelStateResponseFactory =
                    _ => new ObjectResult("Invalid model") { StatusCode = 500 };
            })
            .AddJsonOptions(options => {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

        builder.Services
            .AddApplicationDbContext(builder.Configuration.GetConnectionString("Blog")!)
            .AddIdentity<User, Role>(options => {
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<BlogDbContext>()
            .AddDefaultTokenProviders();

        builder.Services
            .AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:AccessToken:Secret"]!)),
                    ClockSkew = TimeSpan.Zero
                };
            });

        builder.Services.AddAuthorization(options => {
            options.AddPolicy(Policy.MultiRole, policy => {
                policy.RequireRole([Roles.Admin, Roles.User]);
            });
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options => {
            options.AddDefaultPolicy(policy =>
                policy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseStaticFiles();
        app.UseHsts();
        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllerRoute("default", "{controller=Home}/{action=Index}");

        using var scope = app.Services.CreateScope();
        var serviceProvider = scope.ServiceProvider;
        var context = serviceProvider.GetRequiredService<BlogDbContext>();
        context.Seed(serviceProvider);

        app.Run();
    }
}
