using Domain;
using FluentValidation;

namespace Application.Hubla.Sale
{
    public class SaleValidator : AbstractValidator<HublaNewSale>
    {
        public SaleValidator()
        {
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Event).NotEmpty();
        }
    }
}