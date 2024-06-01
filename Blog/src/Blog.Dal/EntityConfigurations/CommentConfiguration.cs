using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Blog.Dal.EntityConfigurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment> {
    public void Configure(EntityTypeBuilder<Comment> builder) {
        builder.HasKey(x => x.Id);
        builder
            .Property(x => x.Message)
            .IsRequired()
            .HasMaxLength(1000);
    }
}
