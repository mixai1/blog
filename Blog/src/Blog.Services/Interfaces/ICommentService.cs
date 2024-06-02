using Blog.Dtos.Comment;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface ICommentService {
    Task<long> AddAsync(CommentModel model);
    Task<long> DeleteAsync(long commentId);
    Task<CommentModel> GetByIdAsync(long commentId);
    Task<CommentModel> UpdateAsync(CommentModel model);
}
