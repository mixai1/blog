using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Dal.EntityConfigurations;

public class UserConfiguration : IEntityTypeConfiguration<User> {
    public void Configure(EntityTypeBuilder<User> builder) {
        builder.HasKey(x => x.Id);
        builder
            .Property(x => x.FirstName)
            .HasMaxLength(120);

        builder
            .Property(x => x.LastName)
            .HasMaxLength(120);

        builder
            .HasMany(x => x.Roles)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasMany(x => x.Posts)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder
            .HasMany(x => x.Comments)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.SetNull);
                
    }
}