using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Hubla.Sale
{
    public class CreateCanceledSale
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
                // Lógica para criar uma nova venda
                _context.HublaCanceledSales.Add(request.HublaCanceledSale);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create canceled sale");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}