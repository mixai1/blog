using Blog.Dtos.Security;
using Blog.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Blog.Application.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase {
    private readonly IAuthorizationService _authorizationService;

    public AuthorizationController(IServiceProvider service) {
        _authorizationService = service.GetRequiredService<IAuthorizationService>();
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(UserRegistrationModel model) {
        var success = await _authorizationService.RegisterUserAsync(model);
        if (!success) {
            return BadRequest();
        }
        return Ok(await _authorizationService.GetJwtAsync(model));
    }

    [HttpPost("RefreshToken")]
    public async Task<IActionResult> RefreshToken(JwtTokensModel model) {
        return Ok(await _authorizationService.RefreshTokenAsync(model));
    }

    [HttpGet("SignOut")]
    public async Task<IActionResult> LogOut() {
        await _authorizationService.LogoutAsync();
        return NoContent();
    }

    [HttpPost("Login")]
    public async Task<IActionResult> LogIn(UserLoginModel model) {
        var success = await _authorizationService.LoginAsync(model);
        if (!success) {
            return BadRequest();
        }

        return Ok(await _authorizationService.GetJwtAsync(model));
    }
}
