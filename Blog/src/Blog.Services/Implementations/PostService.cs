using Blog.Dal;
using Blog.Dtos.Post;
using Blog.Entities;
using Blog.Services.Interfaces;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Blog.Core.PrincipalExtensions;

namespace Blog.Services.Implementations;
public class PostService : IPostService {
    private readonly BlogDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly long _userId;

    public PostService(IServiceProvider service) {
        _dbContext = service.GetRequiredService<BlogDbContext>();
        _mapper = service.GetRequiredService<IMapper>();
        var user = service.GetRequiredService<IPrincipal>();
        _userId = user.GetUserId();
    }

    public async Task<PostListModel> AddAsync(PostModel model) {
        model.UserId ??= _userId;
        var post = _mapper.Map<Post>(model);
        await _dbContext.Posts.AddAsync(post);
        await _dbContext.SaveChangesAsync();
        return await _dbContext.Posts
            .ProjectToType<PostListModel>()
            .FirstAsync(x => x.Id == post.Id);
    }

    public async Task<long> DeleteAsync(long postId) {
        await _dbContext.Posts
            .Where(x => x.Id == postId)
            .ExecuteDeleteAsync();
        return postId;
    }

    public Task<PostListModel> GetByIdAsync(long postId) {
        return _dbContext.Posts
            .AsNoTracking()
            .ProjectToType<PostListModel>()
            .FirstAsync(x => x.Id == postId);
    }

    public Task<List<PostListModel>> GetAllPost() {
       return _dbContext.Posts
            .AsNoTracking()
            .Include(x => x.Comments
                .OrderBy(y => y.CreateTime)
                .Take(30)
             )
            .ProjectToType<PostListModel>()
            .OrderBy(x => x.CreateTime)
            .ToListAsync();
    }

    public async Task<PostModel> UpdateAsync(PostModel model) {
        await _dbContext.Posts
            .Where(x => x.Id == model.Id)
            .ExecuteUpdateAsync(x => x
                    .SetProperty(p => p.Header, p => model.Header)
                    .SetProperty(p => p.Photo, p => model.Photo)
                    .SetProperty(p => p.Body, p => model.Body)
            );
        return model;
    }
}
