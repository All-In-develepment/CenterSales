using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Seller
{
    public class ListSeller
    {
        public class Query : IRequest<Result<PagedList<SellerDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<SellerDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<SellerDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Sellers
                    .OrderBy(x => x.SellerName)
                    .ProjectTo<SellerDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<SellerDto>>
                    .Success(await PagedList<SellerDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}