using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using ClientBlazor;
using Blazored.LocalStorage;
using ClientBlazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddAuthorizationCore();

var apiBaseUrl = builder.HostEnvironment.IsDevelopment()
    ? "http://localhost:8080/api/"  // URL da API para desenvolvimento
    : "https://api.minhaaplicacao.com/api/"; // URL da API para produção

// builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped(sp => new HttpClient 
{ 
    BaseAddress = new Uri(apiBaseUrl) 
});
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<SellerService>();
builder.Services.AddScoped<BookMakerServices>();
builder.Services.AddScoped<EventServices>();
builder.Services.AddScoped<SalesPerformanceTeamServices>();
builder.Services.AddScoped<ProjectWeightServices>();

// Registrando o Blazored.LocalStorage
builder.Services.AddBlazoredLocalStorage();

await builder.Build().RunAsync();
