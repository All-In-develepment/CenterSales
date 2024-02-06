using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.Sale
{
    public class ListCanceledSale
    {
        public class Query : IRequest<Result<List<CanceledSaleDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<CanceledSaleDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<CanceledSaleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var config = await _context.RunConfigs
                //     .ProjectTo<ConfigurationDto>(_mapper.ConfigurationProvider)
                //     .ToListAsync();

                return Result<List<CanceledSaleDto>>.Success(await _context.HublaCanceledSales
                    .ProjectTo<CanceledSaleDto>(_mapper.ConfigurationProvider)
                    .ToListAsync());
            }
        }
        
    }
}