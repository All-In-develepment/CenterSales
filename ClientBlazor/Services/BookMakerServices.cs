using System.Net.Http.Json;
using Domain;

namespace ClientBlazor.Services;
public class BookMakerServices
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public BookMakerServices(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    // Método para criar um BookMaker
    public async Task<bool> CreateBookmakerAsync(Bookmaker bookMakerModel)
    {
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("bookmaker", bookMakerModel);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar a lista de BookMakers
    public async Task<List<Bookmaker>> GetBookmakersAsync()
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<List<Bookmaker>>("bookmaker");

        return response ?? new List<Bookmaker>();
    }

    // Método para atualizar um BookMaker
    public async Task<bool> UpdateBookmakerAsync(Guid id, Bookmaker updatedBookMaker)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"bookmaker/{id}", updatedBookMaker);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar um BookMaker pelo ID
    public async Task<Bookmaker> GetBookmakerByIdAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<Bookmaker>($"bookmaker/{id}");

        return response ?? throw new Exception("BookMaker not found");
    }

}