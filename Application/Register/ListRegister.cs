using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Register
{
    public class ListRegister
    {
        public class Query : IRequest<Result<PagedList<RegisterDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<RegisterDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<RegisterDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Registers
                    .OrderBy(d => d.RegisterDate)
                    .ProjectTo<RegisterDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<RegisterDto>>
                    .Success(await PagedList<RegisterDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}