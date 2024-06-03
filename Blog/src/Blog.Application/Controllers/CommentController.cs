using Blog.Core.Constants;
using Blog.Dtos.Comment;
using Blog.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Blog.Application.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase {
    private readonly ICommentService _commentService;

    public CommentController(IServiceProvider service) {
        _commentService = service.GetRequiredService<ICommentService>();
    }

    [HttpGet("{commentId}")]
    public async Task<IActionResult> GetCommentById(long commentId) {
        return Ok(await _commentService.GetByIdAsync(commentId));
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment(CommentModel model) {
        return Ok(await _commentService.AddAsync(model));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPut]
    public async Task<IActionResult> UpdateComment(CommentModel model) {
        return Ok(await _commentService.UpdateAsync(model));
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> DeleteComment(long commentId) {
        return Ok(await _commentService.DeleteAsync(commentId));
    }
}
