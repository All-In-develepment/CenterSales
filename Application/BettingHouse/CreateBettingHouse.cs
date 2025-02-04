using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BettingHouse
{
    public class CreateBettingHouse
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.BettingHouse BettingHouse { get; set; }
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
                    RuleFor(x => x.BettingHouse).SetValidator(new BettingHouseValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.BettingHouse.CreatedAt = request.BettingHouse.UpdatedAt = DateTime.Now;
                _context.BettingHouses.Add(request.BettingHouse);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create betting house");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}