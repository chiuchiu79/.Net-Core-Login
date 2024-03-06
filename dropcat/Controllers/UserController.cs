using dropcat.Data;
using dropcat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniExcelLibs;
using System.Reflection.Metadata;

namespace dropcat.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        public UserController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult UserList()
        {
            List<UserInfo> userinfo = new List<UserInfo>();
            userinfo = dbContext.UserInfo.ToList();
            return View(userinfo);
        }

        [HttpPost]
        public IActionResult Search(String keyword, String gender, String education)
        {
            string sqlQuery = "SELECT * FROM UserInfo";

            if (string.IsNullOrEmpty(keyword) && gender == "4" && education == "全部")
            {
                var allUsers = dbContext.UserInfo.ToList();
                var educationCounts = dbContext.UserInfo.GroupBy(u => u.lineid).Select(g => new { LineId = g.Key, Count = g.Count() }).ToList();
                return Ok(new { Users = allUsers, EducationCounts = educationCounts });
            }


            if (!string.IsNullOrEmpty(keyword) || gender != "4" || education != "全部")
            {
                sqlQuery += " WHERE 1=1";

                if (!string.IsNullOrEmpty(keyword))
                {
                    sqlQuery += $" AND username LIKE '%{keyword}%'";
                }

                if (gender != "4")
                {
                    sqlQuery += $" AND gender = '{gender}'";
                }

                if (education != "全部")
                {
                    sqlQuery += $" AND lineid = '{education}'";
                }
            }


            List<UserInfo> searchUser = new List<UserInfo>();
            searchUser = dbContext.UserInfo
                .FromSqlRaw(sqlQuery)
                .ToList();

            if (searchUser.Count == 0)
            {
                return NotFound();
            }

            return Ok(searchUser);
        }

        public class EducationCount
        {
            public string LineId { get; set; }
            public int Count { get; set; }
        }

        public IActionResult ExportExcel()
        {
            List<UserInfo> exportusers = new List<UserInfo>();
            exportusers = dbContext.UserInfo.ToList();
            IEnumerable<object> selectColums = exportusers.Select(u => new
            {
                u.id,
                u.userAccount,
                u.username,
                u.phonenumber,
                u.email,
            });

            MemoryStream memoryStream = new MemoryStream();
            memoryStream.SaveAs(selectColums);
            memoryStream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = "List.xlsx"
            };
        }
    }
}


