using Application.Core;
using MediatR;
using Persistence;

namespace Application.Hubla.NewUser
{
    public class DeleteNewUser
    {
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
                var newUser = await _context.HublaNewUsers.FindAsync(request.Id);

                if (newUser == null) return null;

                _context.Remove(newUser);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the new user");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}