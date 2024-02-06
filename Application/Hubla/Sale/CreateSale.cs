using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Hubla.Sale
{
    public class CreateSale
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HublaNewSale HublaNewSale { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.HublaNewSale).SetValidator(new SaleValidator());
                }
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Lógica para criar uma nova venda
                _context.HublaNewSales.Add(request.HublaNewSale);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create sale");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}