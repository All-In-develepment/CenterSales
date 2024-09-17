// using Application.Core;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

// namespace Application.ProjectWeight
// {
//     public class NormalizeProjectWeight
//     {
//         public class Query : IRequest<Result<PagedList<ProjectWeightDto>>>
//         {
//             public PagingParams Params { get; set; }
//             public DateTime InitialDate { get; set; }
//             public DateTime FinalDate { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, Result<PagedList<ProjectWeightDto>>>
//         {
//             private readonly DataContext _context;
//             private readonly IMapper _mapper;
//             public Handler(DataContext context, IMapper mapper)
//             {
//                 _mapper = mapper;
//                 _context = context;
//             }
//             public async Task<Result<PagedList<ProjectWeightDto>>> Handle(Query request, CancellationToken cancellationToken)
//             {
//                 var query = _context.ProjectWeights
//                     .Where(d => d.Month >= request.InitialDate && d.Month <= request.FinalDate)
//                     .Include(p => p.Project)
//                     .Select(p => new ProjectWeightDto
//                     {
//                         ProjectWeightId = p.ProjectWeightId,
//                         ProjectId = p.ProjectId,
//                         ProjectName = p.Project.ProjectName,
//                         Month = p.Month,
//                         SalesValueWeight = p.SalesValueWeight,
//                         ConversionWeight = p.ConversionWeight,
//                         RegistrationWeight = p.RegistrationWeight,
//                         DepositWeight = p.DepositWeight
//                     })
//                     .AsQueryable();

//                 var projectWeights = Result<PagedList<ProjectWeightDto>>
//                                     .Success(await PagedList<ProjectWeightDto>
//                                     .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));

//                 if (projectWeights == null) return null;

//                 var maxWeight = projectWeights.Value.Max(d => d.SalesValueWeight);
//                 foreach (var item in projectWeights)
//                 {
//                     item.NormalizedWeight = item.Weight / maxWeight;
//                 }

//                 await _context.SaveChangesAsync();

//                 return Result<PagedList<ProjectWeightDto>>.Success(Unit.Value);
//             }
//         }
//     }
// }