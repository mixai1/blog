namespace Blog.Dtos.Security;

public class JwtTokensModel {
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}
