using Blog.Dtos.Security;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface IAuthorizationService {
    Task<bool> LoginAsync(UserLoginModel model);
    Task RegisterUserAsync(UserRegistrationModel model);
    Task LogoutAsync();
}
