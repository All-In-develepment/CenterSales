namespace Application.FutebolVirtualGames
{
    public class GameTimeDto
    {
        public double PercentualGreenColumns { get; set; }
        public int IdCompetion { get; set; }
        public object Descricao { get; set; }
        public object Mercado { get; set; }
        public List<Line> Lines { get; set; }
        public List<Minute> Minutes { get; set; }
        public List<object> ResultadoSequencia { get; set; }
    }

    public class Cell
    {
        public object BorderColor { get; set; }
        public int Minute { get; set; }
        public bool Countable { get; set; }
        public string Result { get; set; }
        public bool IsGreen { get; set; }
        public string Tooltip { get; set; }
        public int SumScore { get; set; }
    }

    public class Line
    {
        public bool ColumnsIsGreen { get; set; }
        public int Hora { get; set; }
        public List<Cell> Cells { get; set; }
        public double Percents { get; set; }
        public double PercentsSelectedMinutes { get; set; }
    }

    public class Minute
    {
        public int Number { get; set; }
        public int CountGreen { get; set; }
        public double Percents { get; set; }
    }
}