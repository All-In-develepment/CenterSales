using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.BettingUser
{
    public class CreateBettingUser
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.BettingUser BettingUser { get; set; }
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
                    RuleFor(x => x.BettingUser).SetValidator(new BettingUserValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // request.BettingUser.CreatedAt = DateTime.Now;
                // request.BettingUser.UpdatedAt = DateTime.Now;

                _context.BettingUsers.Add(request.BettingUser);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create betting user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}