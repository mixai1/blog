using Blog.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace Blog.Entities;

public class Post : IId<long>, IEntity {
    public long Id { get; set; }
    public string Photo {  get; set; } = string.Empty;
    public string Header { get; set; } = string.Empty;
    public DateTime CreateTime { get; set; }

    public User User { get; set; } = new();
    public long? UserId { get; set; }

    public List<Comment> Comments { get; set; } = new();
}