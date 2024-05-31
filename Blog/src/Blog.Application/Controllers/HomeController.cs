using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Application.Controllers;

[AllowAnonymous]
public class HomeController : Controller {
    [HttpGet]
    public IActionResult Index() {
        var file = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
        return PhysicalFile(file, "text/html");
    }
}
