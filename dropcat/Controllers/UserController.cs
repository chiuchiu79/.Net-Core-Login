using ClosedXML.Excel;
using dropcat.Data;
using dropcat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniExcelLibs;
using System.Net;
using System.Net.Mime;
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
                var genderCounts = dbContext.UserInfo.GroupBy(u => u.gender).Select(g => new { Gender = g.Key, Count = g.Count() }).ToList();

                foreach (var user in allUsers)
                {
                    user.usericon = urltobase64(user.usericon);
                }
                return Ok(new { Users = allUsers, EducationCounts = educationCounts, GenderCounts = genderCounts });
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

            foreach (var user in searchUser)
            {
                user.usericon = urltobase64(user.usericon);
            }

            if (searchUser.Count == 0)
            {
                return NotFound();
            }

            return Ok(searchUser);
        }

        public class EducationCount
        {
            public string LineId { get; set; }
            public string Gender { get; set; }
            public int Count { get; set; }
        }

        //轉換urltobase64
        public String urltobase64(String url)
        {
            try
            {
                WebClient webClient = new();
                byte[] Bytes = webClient.DownloadData(url);
                string Base64 = Convert.ToBase64String(Bytes);
                Base64 = "data:image/jpg;base64," + Base64;
                return Base64;

            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}

