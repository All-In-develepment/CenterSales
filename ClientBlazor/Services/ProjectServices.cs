using System.Net.Http.Json;
using Domain;

namespace ClientBlazor.Services;
public class ProjectService
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public ProjectService(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    public async Task<bool> CreateProjectAsync(Project projectModel)
    {
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("http://localhost:8080/api/projects", projectModel);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar a lista de projetos
    public async Task<List<Project>> GetProjectsAsync()
    {
        // Obtenha o token
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        // Chama a API para buscar os projetos
        var response = await _httpClient.GetFromJsonAsync<List<Project>>("http://localhost:8080/api/projects");

        return response ?? new List<Project>();
    }

    // Método para atualizar o projeto
    public async Task<bool> UpdateProjectAsync(Guid id, Project updatedProject)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"http://localhost:8080/api/projects/{id}", updatedProject);
        return response.IsSuccessStatusCode;
    }

    // Método para buscar um projeto pelo ID
    public async Task<Project> GetProjectByIdAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        // Faz a requisição GET para buscar o projeto pelo ID
        var response = await _httpClient.GetAsync($"http://localhost:8080/api/projects/{id}");

        if (response.IsSuccessStatusCode)
        {
            // Deserializa o conteúdo da resposta para o modelo de Projeto
            var project = await response.Content.ReadFromJsonAsync<Project>();
            return project ?? throw new HttpRequestException("Erro ao buscar o projeto.");
        }
        else
        {
            // Caso haja falha, lança uma exceção
            throw new HttpRequestException("Erro ao buscar o projeto.");
        }
    }

    // Metodo para deletar um projeto
    public async Task<bool> DeleteProjectAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.DeleteAsync($"http://localhost:8080/api/projects/{id}");
        return response.IsSuccessStatusCode;
    }
}