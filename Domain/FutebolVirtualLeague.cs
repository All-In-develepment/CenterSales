using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class FutebolVirtualLeague
    {
        [Key]
        //Classe para registro de jogos de futebol virtual com horário liga, times e horarios
        public Guid VirtualLeagueId { get; set; }
        public string VirtualLeagueCompetition { get; set; }
        public int VirtualLEagueChangeDate { get; set; }
    }
}