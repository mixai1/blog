using System;
using System.Threading.Tasks;
using Blog.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Blog.Application.Filters;

public class ExceptionFilter : IAsyncExceptionFilter {
    private readonly ILoggerFactory _loggerFactory;

    public ExceptionFilter(IServiceProvider serviceProvider) {
        _loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();
    }

    public Task OnExceptionAsync(ExceptionContext context) {
        var logger = _loggerFactory.CreateLogger(context.ActionDescriptor.AttributeRouteInfo?.Name ?? "unknown");
        logger.LogError(context.Exception.Message);
        context.Result = GetErrorResult(context.Exception);

        return Task.CompletedTask;
    }

    private static IActionResult GetErrorResult(Exception exception) {
        return exception switch {
            AccessDeniedException => new ForbidResult(),
            AuthorizationException => new ObjectResult(exception.Message) { StatusCode = StatusCodes.Status417ExpectationFailed },
            ObjectNotFoundException => new NotFoundResult(),
            _ => new ObjectResult(exception.Message) { StatusCode = StatusCodes.Status500InternalServerError }
        };
    }
}