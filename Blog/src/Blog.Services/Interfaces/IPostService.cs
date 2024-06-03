using System.Collections.Generic;
using Blog.Dtos.Post;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface IPostService {
    Task<long> AddAsync(PostModel model);
    Task<long> DeleteAsync(long postId);
    Task<PostModel> GetByIdAsync(long postId);
    Task<List<PostListModel>> GetAllPost();
    Task<PostModel> UpdateAsync(PostModel model);
}
