using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FutebolVirtualLeagues
{
    public class DetailsLeague
    {
        // Classe de detalhes de ligas de futebol virtual
        public class Query : IRequest<Result<FutebolVirtualLeaguesDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<FutebolVirtualLeaguesDto>>
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

            public async Task<Result<FutebolVirtualLeaguesDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var futebolVirtualLeague = await _context.FutebolVirtualLeagues
                    .ProjectTo<FutebolVirtualLeaguesDto>(_mapper.ConfigurationProvider, new{currentUsername = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.VirtualLeagueId == request.Id);

                return Result<FutebolVirtualLeaguesDto>.Success(futebolVirtualLeague);
            }
        }
    }
}