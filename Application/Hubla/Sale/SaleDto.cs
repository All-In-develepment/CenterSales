using Domain;

namespace Application.Hubla.Sale
{
    public class SaleDto
    {
        public Guid HublaNewSaleId { get; set; }
        public string Type { get; set; }
        public HublaEventNewSale @Event { get; set; }
    }
}