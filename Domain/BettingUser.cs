namespace Domain
{
    public class BettingUser
    {
        public int Id { get; set; }
        public int TelegramUserId { get; set; }
        public TelegramUser TelegramUser { get; set; }
        public int BettingHouseId { get; set; }
        public BettingHouse BettingHouse { get; set; }
        public string AfiliateCode { get; set; }
    }
}