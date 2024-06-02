using Blog.Dtos.Comment;
using Blog.Services.Interfaces;
using System.Threading.Tasks;

namespace Blog.Services.Implementations;

public class CommentService : ICommentService {
    public Task<long> AddAsync(CommentModel model) {
        throw new System.NotImplementedException();
    }

    public Task<long> DeleteAsync(long commentId) {
        throw new System.NotImplementedException();
    }

    public Task<CommentModel> GetByIdAsync(long commentId) {
        throw new System.NotImplementedException();
    }

    public Task<CommentModel> UpdateAsync(CommentModel model) {
        throw new System.NotImplementedException();
    }
}
