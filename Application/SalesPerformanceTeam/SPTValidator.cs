using FluentValidation;

namespace Application.SalesPerformanceTeam
{
    public class SPTValidator : AbstractValidator<Domain.SalesPerformanceTeam>
    {
        public SPTValidator()
        {
            RuleFor(x => x.SPTDate).NotEmpty();
            RuleFor(x => x.SPTTotalLeads).NotEmpty();
            RuleFor(x => x.SPTTotalSales).NotEmpty();
            RuleFor(x => x.SPTTotalSalesAmont).NotEmpty();
            RuleFor(x => x.SPTTotalRegister).NotEmpty();
            RuleFor(x => x.SPTTotalRegisterAmont).NotEmpty();
            RuleFor(x => x.SPTTotalRedeposit).NotEmpty();
            RuleFor(x => x.SPTTotalRedepositAmont).NotEmpty();
            RuleFor(x => x.SPTBookmakerId).NotEmpty();
            RuleFor(x => x.SPTSellerId).NotEmpty();
            RuleFor(x => x.SPTProjectId).NotEmpty();
            RuleFor(x => x.SPTEventId).NotEmpty();
        }
    }
}