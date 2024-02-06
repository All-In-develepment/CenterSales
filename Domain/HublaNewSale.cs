using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaNewSale
    {
        [Key]
        public Guid HublaNewSaleId { get; set; }
        public string Type { get; set; }
        public HublaEventNewSale @Event { get; set; }
    }
}