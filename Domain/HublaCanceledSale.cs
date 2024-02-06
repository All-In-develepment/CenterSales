using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaCanceledSale
    {
        [Key]
        public Guid HublaCanceledSaleId { get; set; }
        public string Type { get; set; }
        public HublaEventCanceledSale @Event { get; set; }
    }
}