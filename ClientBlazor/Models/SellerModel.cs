namespace ClientBlazor.Models;

public class SellerModel
{
    public Guid SellerId { get; set; }
    public string? SellerName { get; set; }
    public bool SellerIsActive { get; set; }
    public Guid ProjectId { get; set; }  // ProjectId diretamente
    public string? ProjectName { get; set; }  // ProjectName diretamente
}
