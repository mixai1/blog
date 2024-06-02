using Blog.Dtos.Comment;
using Blog.Entities;
using Mapster;

namespace Blog.Services.MappingConfiguration;

public static class CommentConfiguration {
    public static TypeAdapterConfig AddCommentConfiguration(this TypeAdapterConfig config) {
        config.NewConfig<CommentModel, Comment>();
        config.NewConfig<Comment, CommentModel>();
        return config;
    }
}
