using Domain;
using FluentValidation;

namespace Application.TelegramUsers
{
    public class TelegramUserCreateValidator : AbstractValidator<TelegramUser>
    {
        public TelegramUserCreateValidator()
        {
            RuleFor(x => x.UserTelegramName).NotEmpty();
        }
    }
}