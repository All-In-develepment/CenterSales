using System.Net.Http.Json;

namespace GetJsonExample
{
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

    public class Match
    {
        public Data Data { get; set; }
        public List<HomeTop3> HomeTop3 { get; set; }
        public List<AwayTop3> AwayTop3 { get; set; }
    }

    public class Maxima
    {
        public List<ListMaxima> ListMaximas { get; set; }
        public List<Match> Matches { get; set; }
        public Chart Chart { get; set; }
    }


    public class Teste
    {
        public async Task<Maxima> Main()
        {
            // Cria um cliente HTTP
            var client = new HttpClient();

            // Define a URL da API
            string url = "https://www.milionariotips.com.br/Api/view/maxima/competition/20120650";

            // Faz uma requisição GET e obtém um objeto Movie a partir do JSON
            var maxima = await client.GetFromJsonAsync<Maxima>(url);

            // Adicionar cabeçalhos HTTP
            client.DefaultRequestHeaders.Add("Cookie", ".AspNet.ApplicationCookie=c196YbfCviSu3mM1syXsznytQFztDytwveO0pji0BHogf3V02e-ik3dOAuxt74LyA4vc7FDBHTaxzcgAc8ISvZVd3hjowywsqn8Wrl-l4-zoBSqUwcM_KYpMs1XtPnfickAD8c-K8J804zEAyzm40TiVypi4LG3PkDv0BTic_7hP81l1EuICbHvLUhTdKbzOIdgXXLeA7ZjTj6OH87ic8n_7GNerOG6o_EzAeMUNL9DnwZtnadZ2qPtn8CcdZ_jGqtQkLVt7bWz39oPbydncqKCjBFyY9oX1XUNGbyP8pexuIo2u03v0jFo0qkGMOv0o9BvD3tjxrp3tmkldMoZEpHthJ43V7G-tw9aiEtH4cKTBGmYsstiWsXY4e1R7vAD5o3kMV5Dx2Xkl3udDBixRw7oeelRnuIWJhxCEQCI4HEgaKeT2JGScCWtbv4mHq4trY3jwE4QKzIv5rNiZGu9EPaITbWC9MQCpmY-GKue0OANInsHq1LHPFaEkbd5jKgra;");

            // Exibe as informações do filme
            Console.WriteLine($"Name: {maxima.ListMaximas[0].Nome}");
            Console.WriteLine($"Release date: {maxima.Matches[0].Data.Date}");
            // Console.WriteLine($"Genres: {string.Join(", ", maxima.Genres)}");

            return maxima;
        }
    }
}
