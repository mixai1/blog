using Blog.Core.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Blog.Entities;

public class Role : IdentityRole<long>, IId<long>, IEntity {
    public long? UserId { get; set; }
    public User User { get; set; } = new();
}