namespace Application.TelegramUsers
{
    public class TelegramUserDto
    {
        public int Id { get; set; }
        public string UserTelegramName { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}