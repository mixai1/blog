using Blog.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Blog.Dal;

public class BlogDbContext : IdentityDbContext<User, Role, long> {
    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
    }
}
