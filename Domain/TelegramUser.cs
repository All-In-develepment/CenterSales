namespace Domain
{
    public class TelegramUser
    {
        public int Id { get; set; }
        public string UserTelegramName { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}