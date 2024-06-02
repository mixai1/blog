using Blog.Dtos.Post;
using Blog.Dtos.Security;
using Blog.Entities;
using Mapster;

namespace Blog.Services.MappingConfiguration;

public static class PostConfiguration {
    public static TypeAdapterConfig AddPostConfiguration(this TypeAdapterConfig config) {
        config.NewConfig<PostModel, Post>();
        config.NewConfig<Post, PostModel>();
        return config;
    }
}
