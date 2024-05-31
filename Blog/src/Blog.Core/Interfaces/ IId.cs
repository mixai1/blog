namespace Blog.Core.Interfaces;

public interface IId<T> where T : struct {
    public T Id { get; set; }
}