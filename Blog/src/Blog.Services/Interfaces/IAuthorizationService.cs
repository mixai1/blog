using Blog.Dtos.Security;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface IAuthorizationService {
    Task<bool> LoginAsync(UserLoginModel model);
    Task<bool> RegisterUserAsync(UserRegistrationModel model);
    Task<JwtTokensModel> GetJwtAsync(UserLoginModel model);
    Task<JwtTokensModel> GetJwtAsync(UserRegistrationModel model);
    Task LogoutAsync();
}
