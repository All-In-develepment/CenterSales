using System.Runtime.Serialization;

namespace Domain
{
    [DataContract]
    public class Maxima
    {
        [DataMember]
        public List<ListMaxima> ListMaximas { get; set; }
        [DataMember]
        public List<Match> Matches { get; set; }
        [DataMember]
        public Chart Chart { get; set; }

    }

    [DataContract]
    public class Match
    {

        [DataMember]
        public Data Data { get; set; }

        [DataMember]
        public List<HomeTop3> HomeTop3 { get; set; }

        [DataMember]
        public List<AwayTop3> AwayTop3 { get; set; }
    }

    [DataContract]
    public class ListMaxima
    {

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCompetition { get; set; }

        [DataMember]
        public int IdStatistic { get; set; }

        [DataMember]
        public DateTime DataUpdate { get; set; }

        [DataMember]
        public int Atual { get; set; }

        [DataMember]
        public int Maxima { get; set; }

        [DataMember]
        public double Porcentagem { get; set; }

        [DataMember]
        public DateTime? DataEnvio { get; set; }

        [DataMember]
        public object ValorEnvio { get; set; }

        [DataMember]
        public object IdTelegramMessage { get; set; }

        [DataMember]
        public int? IdNextMatch { get; set; }

        [DataMember]
        public bool? IsGreen { get; set; }

        [DataMember]
        public DateTime? GreenRedStartDate { get; set; }

        [DataMember]
        public DateTime? GreenRedEndDate { get; set; }
    }

    [DataContract]
    public class HomeTop3
    {

        [DataMember]
        public string TeamHome { get; set; }

        [DataMember]
        public string TeamAway { get; set; }

        [DataMember]
        public string HomeImg { get; set; }

        [DataMember]
        public string AwayImg { get; set; }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCompetition { get; set; }

        [DataMember]
        public int IdChallenge { get; set; }

        [DataMember]
        public int IdFixture { get; set; }

        [DataMember]
        public DateTime Date { get; set; }

        [DataMember]
        public DateTime UserDate { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public int IdTeamHome { get; set; }

        [DataMember]
        public int IdTeamAway { get; set; }

        [DataMember]
        public int IdTeamWinnerHalfTime { get; set; }

        [DataMember]
        public int IdTeamWinner { get; set; }

        [DataMember]
        public int IdTeamScoreFirst { get; set; }

        [DataMember]
        public string HalfTimeResult { get; set; }

        [DataMember]
        public string FinalTimeResult { get; set; }

        [DataMember]
        public int HalfTimeHomeScore { get; set; }

        [DataMember]
        public int HalfTimeAwayScore { get; set; }

        [DataMember]
        public bool HalfTimeDraw { get; set; }

        [DataMember]
        public bool FinalTimeDraw { get; set; }

        [DataMember]
        public int HomeScore { get; set; }

        [DataMember]
        public int AwayScore { get; set; }

        [DataMember]
        public int SumScore { get; set; }

        [DataMember]
        public int IdTeamScoreLast { get; set; }

        [DataMember]
        public string PositionFirstGoalscorer { get; set; }
    }

    [DataContract]
    public class AwayTop3
    {
        [DataMember]
        public string TeamHome { get; set; }

        [DataMember]
        public string TeamAway { get; set; }

        [DataMember]
        public string HomeImg { get; set; }

        [DataMember]
        public string AwayImg { get; set; }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCompetition { get; set; }

        [DataMember]
        public int IdChallenge { get; set; }

        [DataMember]
        public int IdFixture { get; set; }

        [DataMember]
        public DateTime Date { get; set; }

        [DataMember]
        public DateTime UserDate { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public int IdTeamHome { get; set; }

        [DataMember]
        public int IdTeamAway { get; set; }

        [DataMember]
        public int IdTeamWinnerHalfTime { get; set; }

        [DataMember]
        public int IdTeamWinner { get; set; }

        [DataMember]
        public int IdTeamScoreFirst { get; set; }

        [DataMember]
        public string HalfTimeResult { get; set; }

        [DataMember]
        public string FinalTimeResult { get; set; }

        [DataMember]
        public int HalfTimeHomeScore { get; set; }

        [DataMember]
        public int HalfTimeAwayScore { get; set; }

        [DataMember]
        public bool HalfTimeDraw { get; set; }

        [DataMember]
        public bool FinalTimeDraw { get; set; }

        [DataMember]
        public int HomeScore { get; set; }

        [DataMember]
        public int AwayScore { get; set; }

        [DataMember]
        public int SumScore { get; set; }

        [DataMember]
        public int IdTeamScoreLast { get; set; }

        [DataMember]
        public string PositionFirstGoalscorer { get; set; }
    }

    [DataContract]
    public class Chart
    {

        [DataMember]
        public List<int> Over15 { get; set; }

        [DataMember]
        public List<int> Over25 { get; set; }

        [DataMember]
        public List<int> Under25 { get; set; }

        [DataMember]
        public List<int> AmbasMarcam { get; set; }

        [DataMember]
        public List<int> CasaHT { get; set; }

        [DataMember]
        public List<int> EmpateHT { get; set; }

        [DataMember]
        public List<int> VisitanteHT { get; set; }

        [DataMember]
        public List<int> CasaFT { get; set; }

        [DataMember]
        public List<int> EmpateFT { get; set; }

        [DataMember]
        public List<int> VisitanteFT { get; set; }

        [DataMember]
        public List<int> EmpateOuCasa { get; set; }

        [DataMember]
        public List<int> VisitanteOuCasa { get; set; }

        [DataMember]
        public List<int> EmpateOuVisitante { get; set; }
    }

    [DataContract]
    public class Data
    {

        [DataMember]
        public string TeamHome { get; set; }

        [DataMember]
        public string TeamAway { get; set; }

        [DataMember]
        public string HomeImg { get; set; }

        [DataMember]
        public string AwayImg { get; set; }

        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdCompetition { get; set; }

        [DataMember]
        public int IdChallenge { get; set; }

        [DataMember]
        public int IdFixture { get; set; }

        [DataMember]
        public DateTime Date { get; set; }

        [DataMember]
        public DateTime UserDate { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public int IdTeamHome { get; set; }

        [DataMember]
        public int IdTeamAway { get; set; }

        [DataMember]
        public int IdTeamWinnerHalfTime { get; set; }

        [DataMember]
        public int IdTeamWinner { get; set; }

        [DataMember]
        public int IdTeamScoreFirst { get; set; }

        [DataMember]
        public string HalfTimeResult { get; set; }

        [DataMember]
        public string FinalTimeResult { get; set; }

        [DataMember]
        public int HalfTimeHomeScore { get; set; }

        [DataMember]
        public int HalfTimeAwayScore { get; set; }

        [DataMember]
        public bool HalfTimeDraw { get; set; }

        [DataMember]
        public bool FinalTimeDraw { get; set; }

        [DataMember]
        public int HomeScore { get; set; }

        [DataMember]
        public int AwayScore { get; set; }

        [DataMember]
        public int SumScore { get; set; }

        [DataMember]
        public int IdTeamScoreLast { get; set; }

        [DataMember]
        public string PositionFirstGoalscorer { get; set; }
    }
    
}