using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Dal.EntityConfigurations;

public class PostConfiguration : IEntityTypeConfiguration<Post> {
    public void Configure(EntityTypeBuilder<Post> builder) {
        builder.HasKey(x => x.Id);

        builder
            .Property(x => x.Header)
            .IsRequired()
            .HasMaxLength(5000);

        builder
            .Property(x => x.Photo)
            .HasMaxLength(500);

        builder
            .Property(x => x.CreateTime)
            .IsRequired();

        builder
            .HasMany(x => x.Comments)
            .WithOne(x => x.Post)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
