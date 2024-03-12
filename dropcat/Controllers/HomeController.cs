using dropcat.Data;
using dropcat.Models;
using dropcat.Service;
using Microsoft.AspNetCore.Mvc;
using MiniExcelLibs;
using System.Diagnostics;
using WkHtmlToPdfDotNet;

namespace dropcat.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext dbContext;
        private readonly LoginService loginService;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, LoginService login)
        {
            _logger = logger;
            dbContext = context;
            this.loginService = login;
        }

        public IActionResult Index()
        {
            List<UserInfo> userinfo = new List<UserInfo>();
            userinfo = dbContext.UserInfo.ToList();
            return View(userinfo);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult mainPage()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login([FromBody] Dictionary<String, String> logindata)
        {
            String identifier = logindata["username"];
            String password = logindata["password"];

            UserInfo user = loginService.verify(identifier, password);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest("帳號或密碼錯誤，請重新輸入");
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}