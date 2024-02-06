using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.Sale
{
    public class ListSale
    {
        public class Query : IRequest<Result<List<SaleDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<SaleDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<SaleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var config = await _context.RunConfigs
                //     .ProjectTo<ConfigurationDto>(_mapper.ConfigurationProvider)
                //     .ToListAsync();

                return Result<List<SaleDto>>.Success(await _context.HublaNewSales
                    .ProjectTo<SaleDto>(_mapper.ConfigurationProvider)
                    .ToListAsync());
            }
        }
        
    }
}