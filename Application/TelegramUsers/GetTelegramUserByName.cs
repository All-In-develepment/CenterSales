using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TelegramUsers
{
    public class GetTelegramUserByName
    {
        public class Query : IRequest<Result<TelegramUserDto>>
        {
            public string UserTelegramName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TelegramUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<TelegramUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var telegramUser = await _context.TelegramUsers
                    .ProjectTo<TelegramUserDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.UserTelegramName == request.UserTelegramName);

                return Result<TelegramUserDto>.Success(telegramUser);
            }
        }
    }
}