namespace Blog.Exceptions;

public class ExpectationFailedException : Exception {
    public ExpectationFailedException(string message) : base(message) { }
}
