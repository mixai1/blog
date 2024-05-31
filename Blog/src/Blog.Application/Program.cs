using System.Text.Json.Serialization;
using Blog.Application.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Blog.Application;

public class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services
            .AddResponseCompression()
            .AddResponseCaching();

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

        app.UseAuthorization();


        app.MapControllerRoute("default", "{controller=Home}/{action=Index}");

        app.Run();
    }
}
