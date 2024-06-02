using Blog.Dal;
using Blog.Dtos.Post;
using Blog.Entities;
using Blog.Services.Interfaces;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Services.Implementations;
public class PostService : IPostService {
    private readonly BlogDbContext _dbContext;
    private readonly IMapper _mapper;

    public PostService(IServiceProvider service) {
        _dbContext = service.GetRequiredService<BlogDbContext>();
        _mapper = service.GetRequiredService<IMapper>();
    }

    public async Task<long> AddAsync(PostModel model) {
        var post = _mapper.Map<Post>(model);
        await _dbContext.Posts.AddAsync(post);
        await _dbContext.SaveChangesAsync();
        return post.Id;
    }

    public async Task<long> DeleteAsync(long postId) {
        await _dbContext.Posts
            .Where(x => x.Id == postId)
            .ExecuteDeleteAsync();
        return postId;
    }

    public Task<PostModel> GetByIdAsync(long postId) {
        return _dbContext.Posts
            .AsNoTracking()
            .ProjectToType<PostModel>()
            .FirstAsync(x => x.Id == postId);
    }

    public async Task<PostModel> UpdateAsync(PostModel model) {
        await _dbContext.Posts.ExecuteUpdateAsync(x => x
                .SetProperty(p => p.Header, p => model.Header)
                .SetProperty(p => p.Photo, p => model.Photo)
                .SetProperty(p => p.Body, p => model.Body)
                );
        return model;
    }
}
