using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.FutebolVirtualGames
{
    public class ListGames
    {
        //Classe de listagem de jogos de futebol virtual
        public class Query : IRequest<Result<PagedList<FutebolVirtualGamesDto>>>
        {
            public FutebolVirtualGamesParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<FutebolVirtualGamesDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<FutebolVirtualGamesDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var futebolVirtualGames = _context.FutebolVirtualGames
                    // .Where(x => x.LeagueId == request.Params.LeagueId)
                    .OrderBy(d => d.Date)
                    .ProjectTo<FutebolVirtualGamesDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var futebolVirtualGamesToReturn = _mapper.Map<List<FutebolVirtualGamesDto>>(futebolVirtualGames);

                return Result<PagedList<FutebolVirtualGamesDto>>
                    .Success(await PagedList<FutebolVirtualGamesDto>
                    .CreateAsync(futebolVirtualGames, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}