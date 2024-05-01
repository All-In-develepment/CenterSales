using Domain;

namespace Application.Register
{
    public class RegisterDto
    {
        public Guid RegisterId { get; set; }
        public DateTime RegisterDate { get; set; }
        public int RegisterTotal { get; set; }
        public decimal RegisterAmount { get; set; }
        public decimal RegisterAVG { get; set; }
        public decimal RegisterValue { get; set; }
        public Domain.Events Events { get; set; }
        public Guid EventsId { get; set; }
        public Guid SellerId { get; set; }
        public Domain.Seller Seller { get; set; }
        public Guid BookmakerId { get; set; }
        public Bookmaker Bookmaker { get; set; }
    }
}