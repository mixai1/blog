using Blog.Core.Interfaces;

namespace Blog.Dtos.Security;

public class UserLoginModel : IDto {
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
