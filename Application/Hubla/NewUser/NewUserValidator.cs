using Domain;
using FluentValidation;

namespace Application.Hubla.NewUser
{
    public class NewUserValidator : AbstractValidator<HublaNewUser>
    {
        public NewUserValidator()
        {
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Event).NotEmpty();
        }
    }
}