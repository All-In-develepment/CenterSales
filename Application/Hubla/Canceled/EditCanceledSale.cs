using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Hubla.Sale
{
    public class EditCanceledSale
    {
        public class Command : IRequest<Result<Unit>>
        {
            public HublaCanceledSale HublaCanceledSale { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var CanceledSale = await _context.HublaCanceledSales.FindAsync(request.HublaCanceledSale.HublaCanceledSaleId);

                if (CanceledSale == null) return null;

                CanceledSale.Type = request.HublaCanceledSale.Type ?? CanceledSale.Type;
                CanceledSale.Event = request.HublaCanceledSale.Event ?? CanceledSale.Event;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update sale");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}