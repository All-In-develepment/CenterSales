using System.Net.Http.Json;
using Blazored.LocalStorage;
using ClientBlazor.Models;

namespace ClientBlazor.Services;

public class AuthService
{
    private readonly HttpClient _httpClient;
    private readonly ILocalStorageService _localStorageService;

    public AuthService(HttpClient httpClient, ILocalStorageService localStorageService)
    {
        _httpClient = httpClient;
        _localStorageService = localStorageService;
    }

    public async Task<string> Login(string email, string password)
    {
        var loginData = new { email, password };

        // Realiza a requisição POST para o endpoint de login
        var response = await _httpClient.PostAsJsonAsync("account/login", loginData);

        if (response.IsSuccessStatusCode)
        {
            // Captura a resposta JSON que contém o token e outros dados
            var loginResponse = await response.Content.ReadFromJsonAsync<LoginResponse>();

            if (loginResponse != null)
            {
                // Armazena o token e o displayName no LocalStorage
                await _localStorageService.SetItemAsync("authToken", loginResponse.Token);
                await _localStorageService.SetItemAsync("displayName", loginResponse.DisplayName);

                // Retorna o token para possível uso futuro
                return loginResponse.Token!;
            }
            else
            {
                throw new HttpRequestException("Resposta de login inválida.");
            }
        }
        else
        {
            // Caso haja falha, podemos lançar uma exceção ou tratar o erro
            throw new HttpRequestException("Login falhou.");
        }
    }

    // Método para obter o token armazenado
    public async Task<string> GetTokenAsync()
    {
        return await _localStorageService.GetItemAsync<string>("authToken") ?? string.Empty;
    }

    // Método para remover o token (logout)
    public async Task Logout()
    {
        await _localStorageService.RemoveItemAsync("authToken");
        await _localStorageService.RemoveItemAsync("displayName");
    }
}
