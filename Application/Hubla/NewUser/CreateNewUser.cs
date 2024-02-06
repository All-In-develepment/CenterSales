using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Hubla.NewUser
{
    public class CreateNewUser
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HublaNewUser HublaNewUser { get; set; }
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
                // Lógica para criar um novo usuário
                _context.HublaNewUsers.Add(request.HublaNewUser);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create user");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}