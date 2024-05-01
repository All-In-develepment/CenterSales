namespace Application.Bookmakers
{
    public class BookmakerDto
    {
        public Guid BookmakerId { get; set; }
        public string BookmakerName { get; set; }
        public ICollection<Domain.Register> Registers { get; set; }
    }
}