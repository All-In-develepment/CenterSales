using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using Newtonsoft.Json;
using Application.Helpers;

namespace Application.FutebolVirtualGames
{
    public class Max
    {
        // Class to list the max values of the games
        public class Query : IRequest<MaxDto>
        {
            public string League { get; set; }
        }

        public class Handler : IRequestHandler<Query, MaxDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly HttpClient _httpClient;

            public Handler(DataContext context, IMapper mapper, HttpClient httpClient)
            {
                _mapper = mapper;
                _context = context;
                _httpClient = httpClient;
            }

            public async Task<MaxDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // Cria um novo HttpClient
                var client = new HttpClient();

                // Define a URL da API
                string url = "https://www.milionariotips.com.br/Api/view/maxima/competition/" + request.League;

                // Obtem o valor do cookie
                var coockie = _context.Configurations.Where(x => x.ConfigurationName == "Cookie").FirstOrDefault().ConfigurationValue;

                // Adicionar cabeçalhos HTTP
                // client.DefaultRequestHeaders.Add("Cookie", coockie);

                var strJson = JsonHelper.GetJSONString(url, coockie);

                // Converter JSON para objeto
                var max = JsonConvert.DeserializeObject<MaxDto>(strJson);

                // Retorna o valor do objeto
                return max;
            }
        }
    }
}