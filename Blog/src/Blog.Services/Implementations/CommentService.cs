using System;
using System.Linq;
using Blog.Dal;
using Blog.Dtos.Comment;
using Blog.Services.Interfaces;
using MapsterMapper;
using System.Threading.Tasks;
using Blog.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mapster;

namespace Blog.Services.Implementations;

public class CommentService : ICommentService {
    private readonly BlogDbContext _dbContext;
    private readonly IMapper _mapper;

    public CommentService(IServiceProvider service) {
        _dbContext = service.GetRequiredService<BlogDbContext>();
        _mapper = service.GetRequiredService<IMapper>();
    }

    public async Task<long> AddAsync(CommentModel model) {
        var comment = _mapper.Map<Comment>(model);
        await _dbContext.Comments.AddAsync(comment);
        await _dbContext.SaveChangesAsync();
        return comment.Id;
    }

    public async Task<long> DeleteAsync(long commentId) {
        await _dbContext.Comments
            .Where(x => x.Id == commentId)
            .ExecuteDeleteAsync();
        return commentId;
    }

    public Task<CommentModel> GetByIdAsync(long commentId) {
        return _dbContext.Comments
            .AsNoTracking()
            .ProjectToType<CommentModel>()
            .FirstAsync();
    }

    public async Task<CommentModel> UpdateAsync(CommentModel model) {
        await _dbContext.Comments
            .Where(x => x.Id == model.Id)
            .ExecuteUpdateAsync(
                x => x.SetProperty(p => p.Message, p => model.Message)
             );
        return model;
    }
}
