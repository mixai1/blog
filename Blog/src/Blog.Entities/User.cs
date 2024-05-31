using System;
using System.Collections.Generic;
using Blog.Core.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Blog.Entities;

public class User : IdentityUser<long>, IId<long> {
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public List<Role> Roles { get; set; } = new();
    public List<Comment> Comments { get; set; } = new();
}
