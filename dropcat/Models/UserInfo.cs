using System.ComponentModel.DataAnnotations;

//namespace dropcat.Models
//{
//    public class UserInfo
//    {
//        private int id1;

//        [Key]
//        [Required]
//        public int id { get => id1; set => id1 = value; }

//        public string userAccount { get; set; } = string.Empty;

//        public string username { get; set; } = string.Empty;

//        public string phonenumber { get; set; } = string.Empty;

//        public string email { get; set; } = string.Empty;

//        public string password { get; set; } = string.Empty;

//        public DateTime? createtime { get; set; }

//        public DateTime? edittime { get; set; }

//        public string usericon { get; set; } = string.Empty;

//        public string? introduction { get; set; }

//        private int gender
//        {
//            get => gender;
//            set
//            {
//                gender = value;
//            }
//        }

//        public string? resetToken { get; set; }

//        public DateTime? tokenTime { get; set; }
//    }
//}
namespace dropcat.Models
{
    public class UserInfo
    {
        [Key]
        [Required]
        public int id { get; set; }

        public string userAccount { get; set; } = string.Empty;

        public string username { get; set; } = string.Empty;

        public string phonenumber { get; set; } = string.Empty;

        public string email { get; set; } = string.Empty;

        public string password { get; set; } = string.Empty;

        public DateTime? createtime { get; set; }

        public DateTime? edittime { get; set; }

        public string usericon { get; set; } = string.Empty;

        public string? introduction { get; set; }

        private int _gender;

        public int gender 
        {
            get => _gender;
            set => _gender = value;
        }

        public string? resetToken { get; set; }

        public DateTime? tokenTime { get; set; }
    }
}
