using FluentValidation;

namespace Application.BettingHouse
{
    public class BettingHouseValidator : AbstractValidator<Domain.BettingHouse>
    {
        public BettingHouseValidator()
        {
            RuleFor(x => x.BettingHouseName).NotEmpty();
        }
    }
}