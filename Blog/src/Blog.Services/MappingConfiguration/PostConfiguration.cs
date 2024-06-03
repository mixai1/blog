using Blog.Dtos.Post;
using Blog.Entities;
using Mapster;

namespace Blog.Services.MappingConfiguration;

public static class PostConfiguration {
    public static TypeAdapterConfig AddPostConfiguration(this TypeAdapterConfig config) {
        config.NewConfig<PostModel, Post>();
        config.NewConfig<Post, PostModel>();
        config.NewConfig<Post, PostListModel>()
            .Map(dest => dest.Comment, src => src.Comments)
            .PreserveReference(true);
        return config;
    }
}
