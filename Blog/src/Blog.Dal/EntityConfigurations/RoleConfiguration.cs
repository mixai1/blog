using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Blog.Dal.EntityConfigurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role> {
    public void Configure(EntityTypeBuilder<Role> builder) {
        builder.HasKey(x => x.Id);
        builder
            .Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(128);
    }
}
