using System.Runtime.Serialization;

namespace Domain
{
    [DataContract]
    public class LastGame
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Competition { get; set; }

        [DataMember]
        public bool ChangeDate { get; set; }

        [DataMember]
        public List<MatchLastGame> Matches { get; set; }
    }

    [DataContract(Name = "matches")]
    public class MatchLastGame
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string TeamHome { get; set; }

        [DataMember]
        public string TeamAway { get; set; }

        [DataMember]
        public int SumScore { get; set; }

        [DataMember]
        public string FinalTimeResult { get; set; }

        [DataMember]
        public string HalfTimeResult { get; set; }

        [DataMember]
        public DateTime Date { get; set; }

        [DataMember]
        public string HomeImg { get; set; }

        [DataMember]
        public string AwayImg { get; set; }
    }
}