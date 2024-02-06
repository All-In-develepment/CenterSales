using Application.Core;
using MediatR;
using Persistence;

namespace Application.Hubla.Sale
{
    public class DeleteCanceledSale
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var sale = await _context.HublaCanceledSales.FindAsync(request.Id);

                if (sale == null) return null;

                _context.Remove(sale);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the sale");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}