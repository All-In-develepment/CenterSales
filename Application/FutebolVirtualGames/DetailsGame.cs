using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FutebolVirtualGames
{
    public class DetailsGame
    
    {
        //classe de detalhes de jogos de futebol virtual
        public class Query : IRequest<Result<FutebolVirtualGamesDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<FutebolVirtualGamesDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<FutebolVirtualGamesDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var futebolVirtualGame = await _context.FutebolVirtualGames
                    .ProjectTo<FutebolVirtualGamesDto>(_mapper.ConfigurationProvider, new{currentUsername = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<FutebolVirtualGamesDto>.Success(futebolVirtualGame);
            }
        }
    }
}