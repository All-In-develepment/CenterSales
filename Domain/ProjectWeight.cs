using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class ProjectWeight
    {
        public Guid ProjectWeightId { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        public DateTime Month { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal SalesValueWeight { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal ConversionWeight { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal RegistrationWeight { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal DepositWeight { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}