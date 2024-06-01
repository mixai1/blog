using Blog.Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Blog.Application.Controllers;

[Authorize(Roles = Roles.User)]
[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase {
    [HttpGet]
    public async Task<IActionResult> Get() {
        return Ok("ok");
    }
}
