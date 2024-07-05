FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY serverrefactor/bin/Debug/net8.0/ /app


ENTRYPOINT ["dotnet", "ecommerce.dll"]