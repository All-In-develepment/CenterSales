namespace ClientBlazor.Models;

public class SPTModel
{
	public int SptId { get; set; }
	public DateTime SptDate { get; set; }
	public int SptTotalLeads { get; set; }
	public int SptTotalSales { get; set; }
	public int SptTotalSalesAmont { get; set; }
	public int SptAvgSales { get; set; }
	public int SptAvgSalesAmont { get; set; }
	public int SptTotalRegister { get; set; }
	public int SptTotalRegisterAmont { get; set; }
	public int SptAvgRegister { get; set; }
	public int SptAvgRegisterAmont { get; set; }
	public int SptTotalRedeposit { get; set; }
	public int SptTotalRedepositAmont { get; set; }
	public int SptAvgRedeposit { get; set; }
	public int SptAvgRedepositAmont { get; set; }
	public double SptAvgConvertion { get; set; }
	public string? SptBookmakerId { get; set; }
	public string? SptBookmakerName { get; set; }
	public string? SptSellerId { get; set; }
	public string? SptSellerName { get; set; }
	public string? SptProjectId { get; set; }
	public string? SptProjectName { get; set; }
	public string? SptEventId { get; set; }
	public string? SptEventName { get; set; }
	public DateTime SptCreatedAt { get; set; }
	public DateTime SptUpdatedAt { get; set; }
}

