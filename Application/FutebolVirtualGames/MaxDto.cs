namespace Application.FutebolVirtualGames
{
    public class MaxDto
    {
        public List<ListMaxima> ListMaximas { get; set; }
        public List<Match> Matches { get; set; }
        public Chart Chart { get; set; }

    }

    public class Match
    {

        public Data Data { get; set; }

        public List<HomeTop3> HomeTop3 { get; set; }

        public List<AwayTop3> AwayTop3 { get; set; }
    }

    public class ListMaxima
    {

        public string Nome { get; set; }

        public int Id { get; set; }

        public int IdCompetition { get; set; }

        public int IdStatistic { get; set; }

        public DateTime DataUpdate { get; set; }

        public int Atual { get; set; }

        public int Maxima { get; set; }

        public double Porcentagem { get; set; }

        public DateTime? DataEnvio { get; set; }

        public object ValorEnvio { get; set; }

        public object IdTelegramMessage { get; set; }

        public int? IdNextMatch { get; set; }

        public bool? IsGreen { get; set; }

        public DateTime? GreenRedStartDate { get; set; }

        public DateTime? GreenRedEndDate { get; set; }
    }

    public class HomeTop3
    {

        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public string HomeImg { get; set; }

        public string AwayImg { get; set; }

        public int Id { get; set; }

        public int IdCompetition { get; set; }

        public int IdChallenge { get; set; }

        public int IdFixture { get; set; }

        public DateTime Date { get; set; }

        public DateTime UserDate { get; set; }

        public string Title { get; set; }

        public int IdTeamHome { get; set; }

        public int IdTeamAway { get; set; }

        public int IdTeamWinnerHalfTime { get; set; }

        public int IdTeamWinner { get; set; }

        public int IdTeamScoreFirst { get; set; }

        public string HalfTimeResult { get; set; }

        public string FinalTimeResult { get; set; }

        public int HalfTimeHomeScore { get; set; }

        public int HalfTimeAwayScore { get; set; }

        public bool HalfTimeDraw { get; set; }

        public bool FinalTimeDraw { get; set; }

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public int SumScore { get; set; }

        public int IdTeamScoreLast { get; set; }

        public string PositionFirstGoalscorer { get; set; }
    }

    public class AwayTop3
    {
        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public string HomeImg { get; set; }

        public string AwayImg { get; set; }

        public int Id { get; set; }

        public int IdCompetition { get; set; }

        public int IdChallenge { get; set; }

        public int IdFixture { get; set; }

        public DateTime Date { get; set; }

        public DateTime UserDate { get; set; }

        public string Title { get; set; }

        public int IdTeamHome { get; set; }

        public int IdTeamAway { get; set; }

        public int IdTeamWinnerHalfTime { get; set; }

        public int IdTeamWinner { get; set; }

        public int IdTeamScoreFirst { get; set; }

        public string HalfTimeResult { get; set; }

        public string FinalTimeResult { get; set; }

        public int HalfTimeHomeScore { get; set; }

        public int HalfTimeAwayScore { get; set; }

        public bool HalfTimeDraw { get; set; }

        public bool FinalTimeDraw { get; set; }

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public int SumScore { get; set; }

        public int IdTeamScoreLast { get; set; }

        public string PositionFirstGoalscorer { get; set; }
    }

    public class Chart
    {

        public List<int> Over15 { get; set; }

        public List<int> Over25 { get; set; }

        public List<int> Under25 { get; set; }

        public List<int> AmbasMarcam { get; set; }

        public List<int> CasaHT { get; set; }

        public List<int> EmpateHT { get; set; }

        public List<int> VisitanteHT { get; set; }

        public List<int> CasaFT { get; set; }

        public List<int> EmpateFT { get; set; }

        public List<int> VisitanteFT { get; set; }

        public List<int> EmpateOuCasa { get; set; }

        public List<int> VisitanteOuCasa { get; set; }

        public List<int> EmpateOuVisitante { get; set; }
    }

    public class Data
    {

        public string TeamHome { get; set; }

        public string TeamAway { get; set; }

        public string HomeImg { get; set; }

        public string AwayImg { get; set; }

        public int Id { get; set; }

        public int IdCompetition { get; set; }

        public int IdChallenge { get; set; }

        public int IdFixture { get; set; }

        public DateTime Date { get; set; }

        public DateTime UserDate { get; set; }

        public string Title { get; set; }

        public int IdTeamHome { get; set; }

        public int IdTeamAway { get; set; }

        public int IdTeamWinnerHalfTime { get; set; }

        public int IdTeamWinner { get; set; }

        public int IdTeamScoreFirst { get; set; }

        public string HalfTimeResult { get; set; }

        public string FinalTimeResult { get; set; }

        public int HalfTimeHomeScore { get; set; }

        public int HalfTimeAwayScore { get; set; }

        public bool HalfTimeDraw { get; set; }

        public bool FinalTimeDraw { get; set; }

        public int HomeScore { get; set; }

        public int AwayScore { get; set; }

        public int SumScore { get; set; }

        public int IdTeamScoreLast { get; set; }

        public string PositionFirstGoalscorer { get; set; }
    }
}