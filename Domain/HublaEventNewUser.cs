using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaEventNewUser
    {
        [Key]
        public Guid HublaEventNewUserId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public string GroupId { get; set; }
        public int Amount { get; set; }
        public string SellerId { get; set; }
        public string UserDocument { get; set; }
        public string GroupName { get; set; }
    }
}