namespace Blog.Exceptions;

public class AccessDeniedException : Exception {
    public AccessDeniedException() { }
    public AccessDeniedException(string message) : base(message) { }
    public AccessDeniedException(string message, Exception e) : base(message, e) { }
}
