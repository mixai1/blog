using System.Collections.Generic;
using Blog.Dtos.Post;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces;

public interface IPostService {
    Task<PostListModel> AddAsync(PostModel model);
    Task<long> DeleteAsync(long postId);
    Task<PostListModel> GetByIdAsync(long postId);
    Task<List<PostListModel>> GetAllPost();
    Task<PostModel> UpdateAsync(PostModel model);
}
