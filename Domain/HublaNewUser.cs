using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaNewUser
    {
        [Key]
        public Guid HublaNewUserId { get; set; }
        public string Type { get; set; }
        public HublaEventNewUser @Event { get; set; }
    }
}