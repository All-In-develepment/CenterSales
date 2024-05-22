using Application.Core;

namespace Application.SalesPerformanceTeam
{
    public class SPTParams : PagingParams
    {
        public DateTime StartDate { get; set; } = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
    }
}