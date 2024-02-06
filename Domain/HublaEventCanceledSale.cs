using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaEventCanceledSale
    {
        [Key]
        public Guid HublaEventCanceledSaleId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public int TotalAmount { get; set; }
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public string Recurring { get; set; }
        public string PaymentMethod { get; set; }
        public string CreditCardLR { get; set; }
        public string Reason { get; set; }
        public List<HublaAffiliate> Affiliates { get; set; }
        public int Discount { get; set; }
        public bool IsRenewing { get; set; }
        public string SellerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string TransactionId { get; set; }
        public string UserDocument { get; set; }
    }
}