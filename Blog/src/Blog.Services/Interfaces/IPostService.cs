using Blog.Dtos.Post;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface IPostService {
    Task<long> AddAsync(PostModel model);
    Task<long> DeleteAsync(long postId);
    Task<PostModel> GetByIdAsync(long postId);
    Task<PostModel> UpdateAsync(PostModel model);
}
