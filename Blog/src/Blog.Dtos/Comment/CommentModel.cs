using Blog.Core.Interfaces;

namespace Blog.Dtos.Comment;

public class CommentModel : IDto {
    public long Id { get; set; }
    public string Message { get; set; } = string.Empty;
    public long CreateTime { get; set; }
    public long? UserId { get; set; }
    public long PostId { get; set; }
}
