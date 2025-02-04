using FluentValidation;

namespace Application.BettingUser
{
    public class BettingUserValidator : AbstractValidator<Domain.BettingUser>
    {
        public BettingUserValidator()
        {
            RuleFor(x => x.TelegramUserId).NotEmpty();
            RuleFor(x => x.BettingHouseId).NotEmpty();
            RuleFor(x => x.AfiliateCode).NotEmpty();
        }
    }
}