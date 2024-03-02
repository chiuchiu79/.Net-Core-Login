using dropcat.Models;
using Microsoft.EntityFrameworkCore;

namespace dropcat.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserInfo> UserInfo { get; set; }
    }

}
