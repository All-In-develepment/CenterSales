using Domain;

namespace Application.Hubla.Sale
{
    public class CanceledSaleDto
    {
        public Guid HublaCanceledSaleId { get; set; }
        public string Type { get; set; }
        public HublaEventCanceledSale @Event { get; set; }
    }
}