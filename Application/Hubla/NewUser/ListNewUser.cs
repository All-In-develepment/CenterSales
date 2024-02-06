using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.NewUser
{
    public class ListNewUser
    {
        public class Query : IRequest<Result<List<NewUserDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<NewUserDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<NewUserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<NewUserDto>>.Success(await _context.HublaNewUsers
                    .ProjectTo<NewUserDto>(_mapper.ConfigurationProvider)
                    .ToListAsync());
            }
        }
    }
}