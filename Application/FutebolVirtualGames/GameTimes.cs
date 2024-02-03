using Application.Core;
using MediatR;
using Persistence;
using Domain;
using Newtonsoft.Json;
using Application.Helpers;

namespace Application.FutebolVirtualGames
{
    public class GameTimes
    {
        public class Query : IRequest<GameTimeDto>
        {
            public string IdCompetion { get; set; }
            public string Market { get; set; }
            public string Time { get; set; }
        }

        public class Handler : IRequestHandler<Query, GameTimeDto>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<GameTimeDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // Cria um novo HttpClient
                var client = new HttpClient();

                // Define a URL da API
                string url = $"https://www.milionariotips.com.br/Api/view/horarios/competition/{request.IdCompetion}/{request.Market}/Resultado%20FT/{request.Time}/0/Invalid%20date";
                // Console.WriteLine(url);

                // Obtem o valor do cookie
                var coockie = _context.Configurations.Where(x => x.ConfigurationName == "Cookie").FirstOrDefault().ConfigurationValue;

                var strJson = JsonHelper.GetJSONString(url, coockie);
                // Console.WriteLine(strJson);

                // Converter Array JSON para objeto
                var result = JsonConvert.DeserializeObject<GameTimeDto>(strJson);

                // Retorna o valor do objeto
                return result;
            }
        }
    }
}