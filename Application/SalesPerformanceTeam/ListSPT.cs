using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SalesPerformanceTeam
{
    public class ListSPT
    {
        public class Query : IRequest<Result<PagedList<SalesPerformaceTeamDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<SalesPerformaceTeamDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<SalesPerformaceTeamDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.SalesPerformanceTeams
                    .Include(s => s.SPTSeller)
                    .Include(b => b.SPTProject)
                    .Include(p => p.SPTEvent)
                    .Select(spt => new SalesPerformaceTeamDto
                    {
                        SPTId = spt.SPTId,
                        SPTDate = spt.SPTDate,
                        SPTTotalLeads = spt.SPTTotalLeads,
                        SPTTotalSales = spt.SPTTotalSales,
                        SPTCreatedAt = spt.SPTCreatedAt,
                        SPTUpdatedAt = spt.SPTUpdatedAt,
                        SPTSellerId = spt.SPTSellerId,
                        SPTSellerName = spt.SPTSeller.SellerName,
                        SPTProjectId = spt.SPTProjectId,
                        SPTProjectName = spt.SPTProject.ProjectName,
                        SPTEventId = spt.SPTEventId,
                        SPTEventName = spt.SPTEvent.EventName,
                        SPTBookmakerId = spt.SPTBookmakerId,
                        SPTBookmakerName = spt.SPTBookmaker.BookmakerName,
                        SPTTotalSalesAmont = spt.SPTTotalSalesAmont,
                        SPTAVGSales = spt.SPTAVGSales,
                        SPTAVGSalesAmont = spt.SPTAVGSalesAmont,
                        SPTTotalRegister = spt.SPTTotalRegister,
                        SPTTotalRegisterAmont = spt.SPTTotalRegisterAmont,
                        SPTAVGRegister = spt.SPTAVGRegister,
                        SPTAVGRegisterAmont = spt.SPTAVGRegisterAmont,
                        SPTTotalRedeposit = spt.SPTTotalRedeposit,
                        SPTTotalRedepositAmont = spt.SPTTotalRedepositAmont,
                        SPTAVGRedeposit = spt.SPTAVGRedeposit,
                        SPTAVGRedepositAmont = spt.SPTAVGRedepositAmont,
                        SPTAVGConvertion = spt.SPTAVGConvertion
                    })
                    .OrderBy(d => d.SPTDate)
                    .ProjectTo<SalesPerformaceTeamDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<SalesPerformaceTeamDto>>
                    .Success(await PagedList<SalesPerformaceTeamDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}