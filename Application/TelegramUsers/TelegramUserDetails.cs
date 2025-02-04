using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TelegramUsers
{
    public class TelegramUserDetails
    {
        public class Query : IRequest<Result<TelegramUserDto>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TelegramUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<TelegramUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var telegramUser = await _context.TelegramUsers
                    .ProjectTo<TelegramUserDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TelegramUserDto>.Success(telegramUser);
            }
        }
    }
}