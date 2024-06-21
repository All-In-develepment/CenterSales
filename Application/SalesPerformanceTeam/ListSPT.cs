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
            public SPTParams Params { get; set; }
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
                if (request.Params.StartDate == null)
                {
                    Console.WriteLine("request.Params.StartDate: " + DateTime.Today.AddDays(-30));
                }
                else
                {
                    Console.WriteLine("request.Params.StartDate: " + request.Params.StartDate);
                }
                Console.WriteLine("request.Params.EndDate: " + request.Params.EndDate);
                Console.WriteLine("request.Params.Seller ID: " + request.Params.SelerId);
                Console.WriteLine("request.Params.Project ID: " + request.Params.ProjectId);
                // var query = _context.SalesPerformanceTeams
                //     .Include(s => s.SPTSeller)
                //     .Include(b => b.SPTProject)
                //     .Include(p => p.SPTEvent)
                //     .Select(spt => new SalesPerformaceTeamDto
                //     {
                //         SPTId = spt.SPTId,
                //         SPTDate = spt.SPTDate,
                //         SPTTotalLeads = spt.SPTTotalLeads,
                //         SPTTotalSales = spt.SPTTotalSales,
                //         SPTCreatedAt = spt.SPTCreatedAt,
                //         SPTUpdatedAt = spt.SPTUpdatedAt,
                //         SPTSellerId = spt.SPTSellerId,
                //         SPTSellerName = spt.SPTSeller.SellerName,
                //         SPTProjectId = spt.SPTProjectId,
                //         SPTProjectName = spt.SPTProject.ProjectName,
                //         SPTEventId = spt.SPTEventId,
                //         SPTEventName = spt.SPTEvent.EventName,
                //         SPTBookmakerId = spt.SPTBookmakerId,
                //         SPTBookmakerName = spt.SPTBookmaker.BookmakerName,
                //         SPTTotalSalesAmont = spt.SPTTotalSalesAmont,
                //         SPTAVGSales = spt.SPTAVGSales,
                //         SPTAVGSalesAmont = spt.SPTAVGSalesAmont,
                //         SPTTotalRegister = spt.SPTTotalRegister,
                //         SPTTotalRegisterAmont = spt.SPTTotalRegisterAmont,
                //         SPTAVGRegister = spt.SPTAVGRegister,
                //         SPTAVGRegisterAmont = spt.SPTAVGRegisterAmont,
                //         SPTTotalRedeposit = spt.SPTTotalRedeposit,
                //         SPTTotalRedepositAmont = spt.SPTTotalRedepositAmont,
                //         SPTAVGRedeposit = spt.SPTAVGRedeposit,
                //         SPTAVGRedepositAmont = spt.SPTAVGRedepositAmont,
                //         SPTAVGConvertion = spt.SPTAVGConvertion
                //     })
                //     .Where(x => 
                //         request.Params.StartDate == null ? x.SPTDate >= DateTime.Today.AddDays(-30) : x.SPTDate >= request.Params.StartDate
                //         && request.Params.EndDate == null ? x.SPTDate <= DateTime.Today : x.SPTDate <= request.Params.EndDate 
                //         && x.SPTSellerId == request.Params.SelerId 
                //         && x.SPTProjectId == request.Params.ProjectId)
                //     .OrderBy(d => d.SPTDate)
                //     .ProjectTo<SalesPerformaceTeamDto>(_mapper.ConfigurationProvider)
                //     .AsQueryable();
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
                .AsQueryable();

                // Adiciona a condição para StartDate
                if (request.Params.StartDate != null)
                {
                    query = query.Where(x => x.SPTDate >= request.Params.StartDate);
                    Console.WriteLine("query: " + query.ToString());
                }
                else
                {
                    query = query.Where(x => x.SPTDate >= DateTime.Today.AddDays(-30));
                }

                // Adiciona a condição para EndDate
                if (request.Params.EndDate != null)
                {
                    query = query.Where(x => x.SPTDate <= request.Params.EndDate);
                }
                else
                {
                    query = query.Where(x => x.SPTDate <= DateTime.Today);
                }

                // Adiciona a condição para SelerId
                if (request.Params.SelerId != null)
                {
                    query = query.Where(x => x.SPTSellerId == request.Params.SelerId);
                }

                // Adiciona a condição para ProjectId
                if (request.Params.ProjectId != null)
                {
                    query = query.Where(x => x.SPTProjectId == request.Params.ProjectId);
                }

                query = query.OrderBy(d => d.SPTDate)
                    .ProjectTo<SalesPerformaceTeamDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                Console.WriteLine("query: " + query.ToString());

                return Result<PagedList<SalesPerformaceTeamDto>>
                    .Success(await PagedList<SalesPerformaceTeamDto>.CreateAsync(query,
                        request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}