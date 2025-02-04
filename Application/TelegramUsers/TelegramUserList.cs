using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TelegramUsers
{
    public class TelegramUserList
    {
        public class Query : IRequest<Result<List<TelegramUserDto>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<TelegramUserDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TelegramUserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.TelegramUsers
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<TelegramUserDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<List<TelegramUserDto>>.Success(await query.ToListAsync());
            }
        }
    }
}