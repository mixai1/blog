namespace Blog.Exceptions;

public class AuthorizationException : Exception {
    public AuthorizationException() { }
    public AuthorizationException(string message) : base(message) { }
    public AuthorizationException(string message, Exception e) : base(message, e) { }
}
