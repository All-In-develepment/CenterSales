using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualLeagues
{
    public class CreateLeague
    {
        // Classe para criação de ligas de futebol virtual
        public class Command : IRequest<Result<Unit>>
        {
            public FutebolVirtualLeague FutebolVirtualLeagues { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            // private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context)
            {
                // _userAccessor = userAccessor;
                _context = context;
            }

            // public class CommandValidator : AbstractValidator<Command>
            // {
            //     public CommandValidator()
            //     {
            //         RuleFor(x => x.FutebolVirtualLeagues).SetValidator(new FutebolVirtualLeaguesValidator());
            //     }
            // }

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

                _context.FutebolVirtualLeagues.Add(request.FutebolVirtualLeagues);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create FutebolVirtualLeagues");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}