using Application.Core;

namespace Application.FutebolVirtualGames
{
    public class FutebolVirtualGamesParams : PagingParams
    {
        public string League { get; set; }
        public int LeagueId { get; set; }
        public DateTime GameDate { get; set; } = DateTime.UtcNow;
    }
}