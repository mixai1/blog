using Blog.Core.Constants;
using Blog.Dtos.Security;
using Blog.Entities;
using Blog.Exceptions;
using Blog.Services.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Services.Implementations;

public class AuthorizationService : IAuthorizationService {
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly SecurityTokenHandler _tokenHandler;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public AuthorizationService(IServiceProvider service) {
        _userManager = service.GetRequiredService<UserManager<User>>();
        _roleManager = service.GetRequiredService<RoleManager<Role>>();
        _tokenHandler = service.GetRequiredService<SecurityTokenHandler>();
        _signInManager = service.GetRequiredService<SignInManager<User>>();
        _configuration = service.GetRequiredService<IConfiguration>();
        _mapper = service.GetRequiredService<IMapper>();
    }

    public async Task DeleteUserAsync(long userId) {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        await _signInManager.SignOutAsync();
        await _userManager.DeleteAsync(user!);
    }

    public async Task<bool> LoginAsync(UserLoginModel model) {
        if (string.IsNullOrEmpty(model?.Email) || string.IsNullOrEmpty(model.Password)) {
            throw new ExpectationFailedException($"Invalid email or password. Email: {model?.Email}");
        }

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) {
            throw new ExpectationFailedException($"Invalid email or password. Email: {model.Email}");
        }

        if (!await _userManager.HasPasswordAsync(user)) {
            await _userManager.AddPasswordAsync(user, model.Password);
        }

        var attempt = await _signInManager.PasswordSignInAsync(user.Email!, model.Password, false, true);
        return attempt.Succeeded;
    }

    public async Task LogoutAsync() {
        await _signInManager.SignOutAsync();
    }

    public async Task<bool> RegisterUserAsync(UserRegistrationModel model) {
        var newUser = _mapper.Map<User>(model);
        var user = await _userManager.FindByEmailAsync(newUser.Email!);
        if (user != null) {
            throw new ExpectationFailedException("User already exist");
        }

        var result = await _userManager.CreateAsync(newUser, model.Password);
        if (result.Succeeded) {
            await _userManager.AddToRoleAsync(newUser, Roles.User);
            await _signInManager.SignInAsync(newUser, false);
        }

        return result.Succeeded;
    }

    public Task<JwtTokensModel> GetJwtAsync(UserLoginModel model) {
        return GetTokensForUser(model.Email);
    }

    public Task<JwtTokensModel> GetJwtAsync(UserRegistrationModel model) {
        return GetTokensForUser(model.Email);
    }

    private async Task<JwtTokensModel> GetTokensForUser(string userName) {
        var user = await _userManager.FindByEmailAsync(userName) ?? throw new ExpectationFailedException("User not Fund");
        var claims = new List<Claim> { 
            new(ClaimTypes.Name, user.UserName!), 
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles) {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var accessTokenSecret = Encoding.UTF8.GetBytes(_configuration["Jwt:AccessToken:Secret"]!);
        var accessTokenExpiration = int.Parse(_configuration["Jwt:AccessToken:ExpirationInMinutes"]!);

        var refreshTokenSecret = Encoding.UTF8.GetBytes(_configuration["Jwt:RefreshToken:Secret"]!);
        var refreshTokenExpiration = int.Parse(_configuration["Jwt:RefreshToken:ExpirationInMinutes"]!);

        return new JwtTokensModel {
            AccessToken = GenerateJwt(claims, accessTokenSecret, accessTokenExpiration),
            RefreshToken = GenerateJwt(claims, refreshTokenSecret, refreshTokenExpiration),
        };
    }

    private string GenerateJwt(IEnumerable<Claim> claims, byte[] secret, int expirationInMinutes) {
        var securityKey = new SymmetricSecurityKey(secret);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationInMinutes),
            signingCredentials: credentials
        );

        return _tokenHandler.WriteToken(token);
    }
}