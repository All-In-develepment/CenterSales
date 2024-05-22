using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.SalesPerformanceTeam
{
    public class CreateSPT
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.SalesPerformanceTeam SPT { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.SPT).SetValidator(new SPTValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.SPT.SPTAVGSales = request.SPT.SPTTotalLeads / request.SPT.SPTTotalSales;
                request.SPT.SPTAVGSalesAmont = request.SPT.SPTTotalSalesAmont / request.SPT.SPTTotalSales;
                request.SPT.SPTAVGRegister = request.SPT.SPTTotalLeads / request.SPT.SPTTotalRegister;
                request.SPT.SPTAVGRegisterAmont = request.SPT.SPTTotalRegisterAmont / request.SPT.SPTTotalRegister;
                request.SPT.SPTAVGRedeposit = request.SPT.SPTTotalLeads / request.SPT.SPTTotalRedeposit;
                request.SPT.SPTAVGRedepositAmont = request.SPT.SPTTotalRedepositAmont / request.SPT.SPTTotalRedeposit;
                request.SPT.SPTAVGConvertion = (request.SPT.SPTAVGSales + request.SPT.SPTAVGRegister + request.SPT.SPTAVGRedeposit) / 3;
                request.SPT.SPTCreatedAt = DateTime.Now;
                request.SPT.SPTUpdatedAt = DateTime.Now;

                _context.SalesPerformanceTeams.Add(request.SPT);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create SPT");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}