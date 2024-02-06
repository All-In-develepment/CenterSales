using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.NewUser
{
    public class DetailsNewUser
    {
        public class Query : IRequest<Result<NewUserDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<NewUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<NewUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Lógica para buscar um novo usuário
                var newUser = await _context.HublaNewUsers
                    .ProjectTo<NewUserDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.HublaNewUserId == request.Id);
                return Result<NewUserDto>.Success(newUser);
            }
        }
    }
}