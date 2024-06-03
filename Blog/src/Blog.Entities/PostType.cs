using Blog.Core.Interfaces;

namespace Blog.Entities;

public class PostType : IId<long>, IEntity {
    public long Id { get; set; }
    public Enums.PostType Type { get; set; }
    public string Content { get; set; } = string.Empty;
}
