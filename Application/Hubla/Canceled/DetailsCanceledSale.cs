using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hubla.Sale
{
    public class DetailsCanceledSale
    {
        public class Query : IRequest<Result<CanceledSaleDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CanceledSaleDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CanceledSaleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sale = await _context.HublaCanceledSales
                    .ProjectTo<CanceledSaleDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.HublaCanceledSaleId == request.Id);

                return Result<CanceledSaleDto>.Success(sale);
            }
        }
    }
}