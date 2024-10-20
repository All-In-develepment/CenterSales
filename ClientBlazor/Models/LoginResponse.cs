namespace ClientBlazor.Models
{
    public class LoginResponse
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string JoinDate { get; set; }
        public string ExpireDate { get; set; }
    }
}