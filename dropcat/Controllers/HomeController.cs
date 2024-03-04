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

        [HttpPost]
        public IActionResult Login([FromBody] Dictionary<String, String> credentials)
        {
            String identifier = credentials["username"];
            String password = credentials["password"];

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

        public IActionResult UserList()
        {
            List<UserInfo> userlist = new List<UserInfo>();
            userlist = dbContext.UserInfo.ToList();
            return View(userlist);
        }

        public IActionResult ExportExcel()
        {
            List<UserInfo> exportusers = new List<UserInfo>();
            exportusers = dbContext.UserInfo.ToList();
            var selectColums = exportusers.Select(u => new
            {
                u.id,
                u.userAccount,
                u.username,
                u.phonenumber,
                u.email,
                u.usericon
            });

            var memoryStream = new MemoryStream();
            memoryStream.SaveAs(selectColums);
            memoryStream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = "List.xlsx"
            };
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
