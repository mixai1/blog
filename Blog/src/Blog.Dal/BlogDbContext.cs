using Blog.Dal.EntityConfigurations;
using Blog.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Blog.Dal;

public class BlogDbContext : IdentityDbContext<User, Role, long> {
    public DbSet<Post> Posts = null!;
    public DbSet<Comment> Comments = null!;

    public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);

        builder
            .ApplyConfiguration(new UserConfiguration())
            .ApplyConfiguration(new RoleConfiguration())
            .ApplyConfiguration(new CommentConfiguration())
            .ApplyConfiguration(new PostConfiguration());
    }
}
