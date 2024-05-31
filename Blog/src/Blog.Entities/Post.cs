using Blog.Core.Interfaces;

namespace Blog.Entities;

public class Post : IId<long>, IEntity {
    public long Id { get; set; }

    public string Header { get; set; } = string.Empty;
}