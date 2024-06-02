using Blog.Core.Interfaces;

namespace Blog.Dtos.Post;

public class PostModel : IDto {
    public long Id { get; set; }
    public string Photo { get; set; } = string.Empty;
    public string Header { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public long CreateTime { get; set; }
    public long? UserId { get; set; }
}
