using System.Runtime.Serialization;

namespace Domain
{
    [DataContract]
    public class GameTime
    {
        [DataMember]
        public double PercentualGreenColumns { get; set; }
        [DataMember]
        public int IdCompetion { get; set; }
        [DataMember]
        public object Descricao { get; set; }
        [DataMember]
        public object Mercado { get; set; }
        [DataMember]
        public List<Line> Lines { get; set; }
        [DataMember]
        public List<Minute> Minutes { get; set; }
        [DataMember]
        public List<object> ResultadoSequencia { get; set; }
    }

    [DataContract]
    public class Cell
    {
        [DataMember]
        public object BorderColor { get; set; }
        [DataMember]
        public int Minute { get; set; }
        [DataMember]
        public bool Countable { get; set; }
        [DataMember]
        public string Result { get; set; }
        [DataMember]
        public bool IsGreen { get; set; }
        [DataMember]
        public string Tooltip { get; set; }
        [DataMember]
        public int SumScore { get; set; }
    }

    [DataContract]
    public class Line
    {
        [DataMember]
        public bool ColumnsIsGreen { get; set; }
        [DataMember]
        public int Hora { get; set; }
        [DataMember]
        public List<Cell> Cells { get; set; }
        [DataMember]
        public double Percents { get; set; }
        [DataMember]
        public double PercentsSelectedMinutes { get; set; }
    }

    [DataContract]
    public class Minute
    {
        [DataMember]
        public int Number { get; set; }
        [DataMember]
        public int CountGreen { get; set; }
        [DataMember]
        public double Percents { get; set; }
    }
}