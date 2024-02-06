using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Hubla.NewUser
{
    public class EditNewUser
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HublaNewUser HublaNewUser { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.HublaNewUser).SetValidator(new NewUserValidator());
                }
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newUser = await _context.HublaNewUsers.FindAsync(request.HublaNewUser.HublaNewUserId);

                if (newUser == null) return null;

                _mapper.Map(request.HublaNewUser, newUser); // Utiliza o

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update new user");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}