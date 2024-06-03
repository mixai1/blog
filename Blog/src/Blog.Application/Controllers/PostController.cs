using Blog.Core.Constants;
using Blog.Dtos.Post;
using Blog.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Blog.Application.Controllers;

[Authorize(Roles = Roles.User)]
[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase {
    private readonly IPostService _postService;

    public PostController(IServiceProvider service) {
        _postService = service.GetRequiredService<IPostService>();
    }

    [HttpGet("{postId}")]
    public async Task<IActionResult> GetPost(long postId) {
        return Ok(await _postService.GetByIdAsync(postId));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPost() {
        return Ok(await _postService.GetAllPost());
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost(PostModel model) {
        return Ok(await _postService.AddAsync(model));
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePost(PostModel model) {
        return Ok(await _postService.UpdateAsync(model));
    }

    [HttpDelete("{postId}")]
    public async Task<IActionResult> DeletePost(long postId) {
        return Ok(await _postService.DeleteAsync(postId));
    }
}
