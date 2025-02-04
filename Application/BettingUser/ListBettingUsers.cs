using Application.Core;
using Application.UserBettingHouse;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BettingUser
{
    public class ListBettingUsers
    {
        public class Query : IRequest<Result<List<BettingUserDto>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<BettingUserDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<BettingUserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.BettingUsers
                    .ProjectTo<BettingUserDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<List<BettingUserDto>>.Success(await query.ToListAsync());
            }
        }
    }
}