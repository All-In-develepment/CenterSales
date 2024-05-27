FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# copy .csproj and restore as distinct layers
COPY "CenterSales.sln" "CenterSales.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"

RUN dotnet restore "CenterSales.sln"

# copy everything else build
COPY . .
WORKDIR /app
RUN dotnet watch run --no-hot-reload --project API

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

EXPOSE 8080

ENTRYPOINT [ "dotnet", "API.dll"]