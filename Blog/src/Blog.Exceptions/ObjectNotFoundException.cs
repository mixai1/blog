namespace Blog.Exceptions;

public class ObjectNotFoundException : Exception {
    public ObjectNotFoundException() { }
    public ObjectNotFoundException(string message) : base(message) { }
    public ObjectNotFoundException(string message, Exception e) : base(message, e) { }
}
