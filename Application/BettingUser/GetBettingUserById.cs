using Application.Core;
using Application.UserBettingHouse;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BettingUser
{
    public class GetBettingUserById
    {
        public class Query : IRequest<Result<BettingUserDto>>
        {
            public int TelegramUserId { get; set; }
            public int BettingHouseId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BettingUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<BettingUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = await _context.BettingUsers
                    .ProjectTo<BettingUserDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.TelegramUserId == request.TelegramUserId && x.BettingHouseId == request.BettingHouseId);

                return Result<BettingUserDto>.Success(query);
            }
        }
    }
}