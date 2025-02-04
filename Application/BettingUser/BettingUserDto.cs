using Domain;

namespace Application.UserBettingHouse
{
    public class BettingUserDto
    {
        public int Id { get; set; }
        public int TelegramUserId { get; set; }
        public int BettingHouseId { get; set; }
        public string AfiliateCode { get; set; }
    }
}