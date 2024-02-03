using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualGames
{
    public class EditGame
    {
        //classe de edição de jogos de futebol virtual
        public class Command : IRequest<Result<Unit>>
        {
            public FutebolVirtualGame FutebolVirtualGames { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FutebolVirtualGames).SetValidator(new FutebolVirtualGamesValidator());
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
                var futebolVirtualGame = await _context.FutebolVirtualGames.FindAsync(request.FutebolVirtualGames.Id);

                if (futebolVirtualGame == null) return null;

                _mapper.Map(request.FutebolVirtualGames, futebolVirtualGame);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Futebol Virtual");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}