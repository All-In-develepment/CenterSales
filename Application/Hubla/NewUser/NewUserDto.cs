using Domain;

namespace Application.Hubla.NewUser
{
    public class NewUserDto
    {
        public Guid HublaNewUserId { get; set; }
        public string Type { get; set; }
        public HublaEventNewUser @Event { get; set; }
    }
}