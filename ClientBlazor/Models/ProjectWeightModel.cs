namespace ClientBlazor.Models
{
    public class ProjectWeightModel
    {
        public string? ProjectWeightId { get; set; }
        public string? ProjectId { get; set; }
        public string? ProjectName { get; set; }
        public DateTime Month { get; set; }
        public double SalesValueWeight { get; set; }
        public double ConversionWeight { get; set; }
        public double RegistrationWeight { get; set; }
        public double DepositWeight { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}