using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TelegramUsers
{
    public class TelegramUserList
    {
        public class Query : IRequest<Result<List<TelegramUser>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<TelegramUser>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TelegramUser>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.TelegramUsers
                    .OrderBy(x => x.CreatedAt)
                    .AsQueryable();

                return Result<List<TelegramUser>>.Success(await query.ToListAsync());
            }
        }
    }
}