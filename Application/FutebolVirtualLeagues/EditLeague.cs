using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualLeagues
{
    public class EditLeague
    {
        // Classe de edição de ligas de futebol virtual
        public class Command : IRequest<Result<Unit>>
        {
            public FutebolVirtualLeague FutebolVirtualLeagues { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FutebolVirtualLeagues).SetValidator(new FutebolVirtualLeaguesValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var futebolVirtualLeague = await _context.FutebolVirtualLeagues.FindAsync(request.FutebolVirtualLeagues.VirtualLeagueId);

                if (futebolVirtualLeague == null) return null;

                _mapper.Map(request.FutebolVirtualLeagues, futebolVirtualLeague);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Futebol Virtual");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}