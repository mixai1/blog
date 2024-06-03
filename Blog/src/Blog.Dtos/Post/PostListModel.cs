using System.Collections.Generic;
using Blog.Dtos.Comment;

namespace Blog.Dtos.Post;

public class PostListModel {
    public long Id { get; set; }
    public string Photo { get; set; } = string.Empty;
    public string Header { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public List<CommentModel> Comment { get; set; } = new();
    public long CreateTime { get; set; }
    public long? UserId { get; set; }
}