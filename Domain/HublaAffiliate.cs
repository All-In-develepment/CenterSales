using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class HublaAffiliate
    {
        [Key]
        public Guid HublaAffiliateId { get; set; }
        public int AffiliateAmount { get; set; }
        public string AffiliateId { get; set; }
        public string AffiliateName { get; set; }
    }
}