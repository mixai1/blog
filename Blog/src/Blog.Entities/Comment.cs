﻿using Blog.Core.Interfaces;

namespace Blog.Entities;

public class Comment : IId<long>, IEntity {
    public long Id { get; set; }
    public string Message { get; set; } = string.Empty;
    public long CreateTime { get; set; }

    public long PostId { get; set; }
    public Post Post { get; set; } = null!;

    public long? UserId { get; set; }
    public User User { get; set; } = null!;
}