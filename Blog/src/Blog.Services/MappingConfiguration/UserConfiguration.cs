using Blog.Dtos.Security;
using Blog.Entities;
using Mapster;

namespace Blog.Services.MappingConfiguration;

public static class UserConfiguration {
    public static TypeAdapterConfig AddUserConfiguration(this TypeAdapterConfig config) {
        config.NewConfig<UserLoginModel, User>();
        return config;
    }
}
