using Domain;
using FluentValidation;

namespace Application.FutebolVirtualGames
{
    public class FutebolVirtualGamesValidator : AbstractValidator<FutebolVirtualGame>
    {
        public FutebolVirtualGamesValidator()
        {
            RuleFor(x => x.IdBet365).NotEmpty();
            RuleFor(x => x.HomeTeam).NotEmpty();
            RuleFor(x => x.AwayTeam).NotEmpty();
            // RuleFor(x => x.SumScore).NotEmpty();
            RuleFor(x => x.FinalTimeResult).NotEmpty();
            RuleFor(x => x.HalfTimeResult).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.HomeImg).NotEmpty();
            RuleFor(x => x.AwayImg).NotEmpty();
            RuleFor(x => x.LeagueId).NotEmpty();
        }
    }
}