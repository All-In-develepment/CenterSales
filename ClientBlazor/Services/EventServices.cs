using System.Net.Http.Json;
using Domain;

namespace ClientBlazor.Services;
public class EventServices
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public EventServices(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    // Método para criar um Evento
    public async Task<bool> CreateEventAsync(Events eventModel)
    {
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("events", eventModel);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar a lista de Eventos
    public async Task<List<Events>> GetEventsAsync()
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<List<Events>>("events");

        return response ?? new List<Events>();
    }

    // Método para atualizar um Evento
    public async Task<bool> UpdateEventAsync(Guid id, Events updatedEvent)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"events/{id}", updatedEvent);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar um Evento pelo ID
    public async Task<Events> GetEventByIdAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        return await _httpClient.GetFromJsonAsync<Events>($"events/{id}") ?? throw new Exception("Evento não encontrado");
    }
}