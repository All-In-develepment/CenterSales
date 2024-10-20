using System.Net.Http.Json;
using Domain;

namespace ClientBlazor.Services;
public class SellerService
{
    private readonly HttpClient _httpClient;
    private readonly AuthService _authService;

    public SellerService(HttpClient httpClient, AuthService authService)
    {
        _httpClient = httpClient;
        _authService = authService;
    }

    public async Task<bool> CreateSellerAsync(Seller sellerModel)
    {
        Console.WriteLine(sellerModel);
        var token = await _authService.GetTokenAsync();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        var response = await _httpClient.PostAsJsonAsync("sellers", sellerModel);
        return response.IsSuccessStatusCode;
    }

    public async Task<List<Seller>> GetSellersAsync()
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<List<Seller>>("sellers");

        return response ?? new List<Seller>();
    }

    public async Task<bool> UpdateSellerAsync(Guid id, Seller updatedSeller)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.PutAsJsonAsync($"sellers/{id}", updatedSeller);
        return response.IsSuccessStatusCode;
    }

    public async Task<Seller> GetSellerByIdAsync(Guid id)
    {
        var token = await _authService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetFromJsonAsync<Seller>($"sellers/{id}");

        return response ?? new Seller();
    }
}