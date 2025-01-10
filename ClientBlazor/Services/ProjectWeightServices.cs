using System.Net.Http.Json;
using Domain;
using ClientBlazor.Models;

namespace ClientBlazor.Services;
public class ProjectWeightServices
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public ProjectWeightServices(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    public async Task<bool> CreateProjectWeightAsync(ProjectWeight projectWeightModel)
    {
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("ProjectWeight", projectWeightModel);
        return response.IsSuccessStatusCode;
    }

    public async Task<List<ProjectWeightModel>> GetProjectWeightsAsync()
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<List<ProjectWeightModel>>("ProjectWeight");

        return response ?? new List<ProjectWeightModel>();
    }

    public async Task<bool> UpdateProjectWeightAsync(Guid id, ProjectWeight updatedProjectWeight)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"ProjectWeight/{id}", updatedProjectWeight);
        return response.IsSuccessStatusCode;
    }

    public async Task<ProjectWeight> GetProjectWeightByIdAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<ProjectWeight>($"ProjectWeight/{id}");

        return response ?? throw new Exception("Project Weight not found");
    }
}