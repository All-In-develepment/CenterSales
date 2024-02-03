using Application.Core;
using MediatR;
using Persistence;
using Domain;
using Newtonsoft.Json;
using Application.Helpers;

namespace Application.FutebolVirtualGames
{
    public class GetOdd
    {
        public class Query : IRequest<Odd>
        {
            public string GameId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Odd>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Odd> Handle(Query request, CancellationToken cancellationToken)
            {
                // Cria um novo HttpClient
                var client = new HttpClient();

                // Define a URL da API
                string url = "https://www.milionariotips.com.br/api/view/odds/" + request.GameId;

                // Obtem o valor do cookie
                var coockie = _context.Configurations.Where(x => x.ConfigurationName == "Cookie").FirstOrDefault().ConfigurationValue;

                var strJson = JsonHelper.GetJSONString(url, coockie);
                // Console.WriteLine(strJson);

                // Converter Array JSON para objeto
                var result = JsonConvert.DeserializeObject<Odd>(strJson);

                // Retorna lista de objetos
                return result;
            }
        }
    }
}