using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BettingHouse
{
    public class GetBetingByName
    {
        public class Query : IRequest<Result<Domain.BettingHouse>>
        {
            public string BettingHouseName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Domain.BettingHouse>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Domain.BettingHouse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bettingHouse = await _context.BettingHouses.FirstOrDefaultAsync(x => x.BettingHouseName == request.BettingHouseName);

                return Result<Domain.BettingHouse>.Success(bettingHouse);
            }
        }
    }
}