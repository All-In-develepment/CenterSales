using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Register
    {
        [Key]
        public Guid RegisterId { get; set; }
        public DateTime RegisterDate { get; set; }
        public int RegisterTotal { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal RegisterAmount { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal RegisterAVG { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal RegisterValue { get; set; }
        
        // Relação de Register com Events, para converter EventsId em EventName
        public Events Events { get; set; }
        public Guid EventsId { get; set; }

        // Relação de Register com Seller, para converter SellerId em SellerName
        public Guid SellerId { get; set; }
        public Seller Seller { get; set; }

        // Relação de Register com Bookmaker, para converter BookmakerId em BookmakerName
        public Guid BookmakerId { get; set; }
        public Bookmaker Bookmaker { get; set; }
    }
}