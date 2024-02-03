using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualGames
{
    public class CreateGame
    {
        //classe para criação de jogos de futebol virtual
        public class Command : IRequest<Result<Unit>>
        {
            public FutebolVirtualGame FutebolVirtualGames { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.FutebolVirtualGames).SetValidator(new FutebolVirtualGamesValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // var user = await _context.Users.FirstOrDefaultAsync(x => 
                //     x.UserName == _userAccessor.GetUsername());

                // var attendee = new ActivityAttendee
                // {
                //     AppUser = user,
                //     Activity = request.Activity,
                //     IsHost = true
                // };

                // request.Activity.Attendees.Add(attendee);

                _context.FutebolVirtualGames.Add(request.FutebolVirtualGames);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create FutebolVirtualGames");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}