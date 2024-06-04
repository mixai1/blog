﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.Dal.Migrations;

[DbContext(typeof(BlogDbContext))]
[Migration("20240604084247_AddedPostType")]
partial class AddedPostType {
    /// <inheritdoc />
    protected override void BuildTargetModel(ModelBuilder modelBuilder) {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.0")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

        modelBuilder.Entity("Blog.Entities.Comment", b => {
            b.Property<long>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("bigint");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

            b.Property<long>("CreateTime")
                .HasColumnType("bigint");

            b.Property<string>("Message")
                .IsRequired()
                .HasMaxLength(1000)
                .HasColumnType("character varying(1000)");

            b.Property<long>("PostId")
                .HasColumnType("bigint");

            b.Property<long?>("UserId")
                .HasColumnType("bigint");

            b.HasKey("Id");

            b.HasIndex("PostId");

            b.HasIndex("UserId");

            b.ToTable("Comments");
        });

        modelBuilder.Entity("Blog.Entities.Post", b => {
            b.Property<long>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("bigint");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

            b.Property<string>("Body")
                .IsRequired()
                .HasColumnType("text");

            b.Property<long>("CreateTime")
                .HasColumnType("bigint");

            b.Property<string>("Header")
                .IsRequired()
                .HasMaxLength(5000)
                .HasColumnType("character varying(5000)");

            b.Property<string>("Photo")
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnType("character varying(500)");

            b.Property<int>("Type")
                .HasColumnType("integer");

            b.Property<long?>("UserId")
                .HasColumnType("bigint");

            b.HasKey("Id");

            b.HasIndex("UserId");

            b.ToTable("Posts");
        });

        modelBuilder.Entity("Blog.Entities.Role", b => {
            b.Property<long>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("bigint");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

            b.Property<string>("ConcurrencyStamp")
                .IsConcurrencyToken()
                .HasColumnType("text");

            b.Property<string>("Name")
                .IsRequired()
                .HasMaxLength(128)
                .HasColumnType("character varying(128)");

            b.Property<string>("NormalizedName")
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.Property<long?>("UserId")
                .HasColumnType("bigint");

            b.HasKey("Id");

            b.HasIndex("NormalizedName")
                .IsUnique()
                .HasDatabaseName("RoleNameIndex");

            b.HasIndex("UserId");

            b.ToTable("AspNetRoles", (string)null);
        });

        modelBuilder.Entity("Blog.Entities.User", b => {
            b.Property<long>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("bigint");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

            b.Property<int>("AccessFailedCount")
                .HasColumnType("integer");

            b.Property<string>("ConcurrencyStamp")
                .IsConcurrencyToken()
                .HasColumnType("text");

            b.Property<string>("Email")
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.Property<bool>("EmailConfirmed")
                .HasColumnType("boolean");

            b.Property<string>("FirstName")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("LastName")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<bool>("LockoutEnabled")
                .HasColumnType("boolean");

            b.Property<DateTimeOffset?>("LockoutEnd")
                .HasColumnType("timestamp with time zone");

            b.Property<string>("NormalizedEmail")
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.Property<string>("NormalizedUserName")
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.Property<string>("PasswordHash")
                .HasColumnType("text");

            b.Property<string>("PhoneNumber")
                .HasColumnType("text");

            b.Property<bool>("PhoneNumberConfirmed")
                .HasColumnType("boolean");

            b.Property<string>("SecurityStamp")
                .HasColumnType("text");

            b.Property<bool>("TwoFactorEnabled")
                .HasColumnType("boolean");

            b.Property<string>("UserName")
                .HasMaxLength(256)
                .HasColumnType("character varying(256)");

            b.HasKey("Id");

            b.HasIndex("NormalizedEmail")
                .HasDatabaseName("EmailIndex");

            b.HasIndex("NormalizedUserName")
                .IsUnique()
                .HasDatabaseName("UserNameIndex");

            b.ToTable("AspNetUsers", (string)null);
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b => {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("integer");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

            b.Property<string>("ClaimType")
                .HasColumnType("text");

            b.Property<string>("ClaimValue")
                .HasColumnType("text");

            b.Property<long>("RoleId")
                .HasColumnType("bigint");

            b.HasKey("Id");

            b.HasIndex("RoleId");

            b.ToTable("AspNetRoleClaims", (string)null);
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b => {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("integer");

            NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

            b.Property<string>("ClaimType")
                .HasColumnType("text");

            b.Property<string>("ClaimValue")
                .HasColumnType("text");

            b.Property<long>("UserId")
                .HasColumnType("bigint");

            b.HasKey("Id");

            b.HasIndex("UserId");

            b.ToTable("AspNetUserClaims", (string)null);
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b => {
            b.Property<string>("LoginProvider")
                .HasColumnType("text");

            b.Property<string>("ProviderKey")
                .HasColumnType("text");

            b.Property<string>("ProviderDisplayName")
                .HasColumnType("text");

            b.Property<long>("UserId")
                .HasColumnType("bigint");

            b.HasKey("LoginProvider", "ProviderKey");

            b.HasIndex("UserId");

            b.ToTable("AspNetUserLogins", (string)null);
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<long>", b => {
            b.Property<long>("UserId")
                .HasColumnType("bigint");

            b.Property<long>("RoleId")
                .HasColumnType("bigint");

            b.HasKey("UserId", "RoleId");

            b.HasIndex("RoleId");

            b.ToTable("AspNetUserRoles", (string)null);
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b => {
            b.Property<long>("UserId")
                .HasColumnType("bigint");

            b.Property<string>("LoginProvider")
                .HasColumnType("text");

            b.Property<string>("Name")
                .HasColumnType("text");

            b.Property<string>("Value")
                .HasColumnType("text");

            b.HasKey("UserId", "LoginProvider", "Name");

            b.ToTable("AspNetUserTokens", (string)null);
        });

        modelBuilder.Entity("Blog.Entities.Comment", b => {
            b.HasOne("Blog.Entities.Post", "Post")
                .WithMany("Comments")
                .HasForeignKey("PostId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            b.HasOne("Blog.Entities.User", "User")
                .WithMany("Comments")
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.SetNull);

            b.Navigation("Post");

            b.Navigation("User");
        });

        modelBuilder.Entity("Blog.Entities.Post", b => {
            b.HasOne("Blog.Entities.User", "User")
                .WithMany("Posts")
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.SetNull);

            b.Navigation("User");
        });

        modelBuilder.Entity("Blog.Entities.Role", b => {
            b.HasOne("Blog.Entities.User", "User")
                .WithMany("Roles")
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.NoAction);

            b.Navigation("User");
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b => {
            b.HasOne("Blog.Entities.Role", null)
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b => {
            b.HasOne("Blog.Entities.User", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b => {
            b.HasOne("Blog.Entities.User", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<long>", b => {
            b.HasOne("Blog.Entities.Role", null)
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            b.HasOne("Blog.Entities.User", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b => {
            b.HasOne("Blog.Entities.User", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity("Blog.Entities.Post", b => {
            b.Navigation("Comments");
        });

        modelBuilder.Entity("Blog.Entities.User", b => {
            b.Navigation("Comments");

            b.Navigation("Posts");

            b.Navigation("Roles");
        });
#pragma warning restore 612, 618
    }
}