using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class FutebolVirtualGame
    {
        [Key]
        public Guid Id { get; set; }
        public int IdBet365 { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public int SumScore { get; set; }
        public string FinalTimeResult { get; set; }
        public string HalfTimeResult { get; set; }
        public DateTime Date { get; set; }
        public string HomeImg { get; set; }
        public string AwayImg { get; set; }
        public int LeagueId { get; set; }
    }
}