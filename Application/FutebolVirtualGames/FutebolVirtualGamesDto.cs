namespace Application.FutebolVirtualGames
{
    public class FutebolVirtualGamesDto
    {
        //DTO para registro de jogos de futebol virtual com horário liga, times e horarios
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