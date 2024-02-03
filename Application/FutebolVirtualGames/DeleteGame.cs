using Application.Core;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualGames
{
    public class DeleteGame
    {
        //classe de exclusão de jogos de futebol virtual
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var futebolVirtualGame = await _context.FutebolVirtualGames.FindAsync(request.Id);

                if (futebolVirtualGame == null) return null;

                _context.Remove(futebolVirtualGame);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the Futebol Virtual Game");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}