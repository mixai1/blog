using Microsoft.AspNetCore.Mvc;

namespace Blog.Application.Controllers;

public class HomeController : ControllerBase {
    [HttpGet]
    public IActionResult Index() {
        var file = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser", "index.html");
        return PhysicalFile(file, "text/html");
    }
}
