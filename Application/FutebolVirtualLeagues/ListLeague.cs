using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.FutebolVirtualLeagues
{
    public class ListLeagues
    {
        // Classe de listagem de ligas de futebol virtual
        public class Query : IRequest<Result<List<FutebolVirtualLeaguesDto>>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<FutebolVirtualLeaguesDto>>>
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

            public async Task<Result<List<FutebolVirtualLeaguesDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var futebolVirtualLeagues = await _context.FutebolVirtualLeagues
                    .ProjectTo<FutebolVirtualLeaguesDto>(_mapper.ConfigurationProvider, new{currentUsername = _userAccessor.GetUsername()})
                    .ToListAsync();

                return Result<List<FutebolVirtualLeaguesDto>>.Success(futebolVirtualLeagues);
            }
        }
    }
}