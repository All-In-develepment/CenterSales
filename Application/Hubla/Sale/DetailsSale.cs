using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.Sale
{
    public class DetailsSale
    {
        public class Query : IRequest<Result<SaleDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<SaleDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<SaleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sale = await _context.HublaNewSales
                    .ProjectTo<SaleDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.HublaNewSaleId == request.Id);

                return Result<SaleDto>.Success(sale);
            }
        }
    }
}