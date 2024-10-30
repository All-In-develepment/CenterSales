using System.Net.Http.Json;
using Domain;
using ClientBlazor.Models;

namespace ClientBlazor.Services;
public class SalesPerformanceTeamServices
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public SalesPerformanceTeamServices(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    public async Task<List<SPTModel>> GetSalesTeamPerformanceAsync()
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<List<SPTModel>>("spt");

        return response ?? new List<SPTModel>();
    }

    // Método para buscar um Evento pelo ID
    public async Task<SalesPerformanceTeam> GetSalesTeamPerformanceByIdAsync(int id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<SalesPerformanceTeam>($"spt/{id}");

        return response ?? new SalesPerformanceTeam();
    }

    // Método para criar um Evento
    public async Task<bool> CreateSalesTeamPerformanceAsync(SalesPerformanceTeam salesPerformanceTeam)
    {
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("spt", salesPerformanceTeam);
        return response.IsSuccessStatusCode;
    }

    // Método para atualizar um Evento
    public async Task<bool> UpdateSalesTeamPerformanceAsync(int id, SalesPerformanceTeam updatedSalesPerformanceTeam)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"spt/{id}", updatedSalesPerformanceTeam);
        return response.IsSuccessStatusCode;
    }
}