using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TelegramUsers
{
    public class CreateTelegramUser
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TelegramUser TelegramUser { get; set; }
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
                    RuleFor(x => x.TelegramUser).SetValidator(new TelegramUserCreateValidator());
                }
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.TelegramUser.CreatedAt = DateTime.Now;
                request.TelegramUser.UpdatedAt = DateTime.Now;

                _context.TelegramUsers.Add(request.TelegramUser);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create telegram user");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}