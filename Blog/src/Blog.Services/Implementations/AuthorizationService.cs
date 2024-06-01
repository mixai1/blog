using Blog.Dtos.Security;
using Blog.Entities;
using Blog.Services.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Blog.Services.Implementations;

public class AuthorizationService : IAuthorizationService {
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public AuthorizationService(IServiceProvider service) {
        _userManager = service.GetRequiredService<UserManager<User>>();
        _mapper = service.GetRequiredService<IMapper>();
    }

    public async Task DeleteUserAsync(long userId) {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        await _userManager.DeleteAsync(user);
    }

    public async Task<bool> LoginAsync(UserLoginModel model) {
        var result = await _userManager.CreateAsync(_mapper.Map<User>(model));
        return result.Succeeded;
    }

    public Task LogoutAsync() {
        throw new NotImplementedException();
    }

    public Task RegisterUserAsync(UserRegistrationModel model) {
        throw new NotImplementedException();
    }
}