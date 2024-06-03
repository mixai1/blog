﻿using Blog.Core.Interfaces;
using System.Collections.Generic;

namespace Blog.Entities;

public class Post : IId<long>, IEntity {
    public long Id { get; set; }
    public string Photo {  get; set; } = string.Empty;
    public string Header { get; set; } = string.Empty;
    public string Body {  get; set; } = string.Empty;
    public long CreateTime { get; set; }

    public long PostTypeId { get; set; }
    public PostType PostType { get; set; } = null!;


    public User User { get; set; } = null!;
    public long? UserId { get; set; }

    public List<Comment> Comments { get; set; } = new();
}