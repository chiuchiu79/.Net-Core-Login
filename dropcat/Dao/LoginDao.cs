using dropcat.Data;
using dropcat.Models;

namespace dropcat.Dao
{
    public class LoginDao
    {
        private readonly ApplicationDbContext appcontext;

        public LoginDao(ApplicationDbContext context)
        {
            appcontext = context;
        }

        public UserInfo FindByUserAccount(string userAccount)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.userAccount == userAccount);
        }
        public UserInfo FindByPhonenumber(string phonenumber)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.phonenumber == phonenumber);
        }
        public UserInfo FindByEmail(string email)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.email == email);
        }
    }
}
