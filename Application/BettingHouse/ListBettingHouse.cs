using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BettingHouse
{
    public class ListBettingHouse
    {
        public class Query : IRequest<Result<List<Domain.BettingHouse>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Domain.BettingHouse>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Domain.BettingHouse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Domain.BettingHouse>>.Success(await _context.BettingHouses.ToListAsync());
            }
        }
    }
}