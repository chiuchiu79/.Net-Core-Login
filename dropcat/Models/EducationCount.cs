using System.ComponentModel.DataAnnotations;

namespace dropcat.Models
{
    public class EducationCount
    {
        [Key] 
        public int Id { get; set; }
        public string lineid { get; set; }
        public int count { get; set; }
    }
}
