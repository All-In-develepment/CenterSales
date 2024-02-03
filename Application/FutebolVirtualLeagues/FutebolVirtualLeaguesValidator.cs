using Domain;
using FluentValidation;

namespace Application.FutebolVirtualLeagues
{
    public class FutebolVirtualLeaguesValidator : AbstractValidator<FutebolVirtualLeague>
    {
        public FutebolVirtualLeaguesValidator()
        {
            // RuleFor(x => x.VirtualLeagueId).NotEmpty();
            RuleFor(x => x.VirtualLeagueCompetition).NotEmpty();
            RuleFor(x => x.VirtualLEagueChangeDate).NotEmpty();
        }
    }
}