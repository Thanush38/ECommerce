using Microsoft.AspNetCore.Mvc;
using server.Models;
using Utils;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "http://localhost:8081")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Register services
builder.Services.AddSingleton<DataReader>();
builder.Services.AddSingleton<SendingEmails>();
builder.Services.AddSingleton<CreateOrder>();

// Add controllers
builder.Services.AddControllers();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

// Map endpoints
app.MapGet("/", () => "hello world");

app.MapGet("/products", (DataReader dataReader) =>
{
    return dataReader.ReadData();
});

app.MapGet("/products/{id}", (string id, DataReader dataReader) =>
{
    return dataReader.ReadData(id);
});

app.MapGet("/product/{id}", (string id, DataReader dataReader) =>
{
    string data = dataReader.ReadAllImages(id);
    return data;
});

app.MapPost("/sendemail", ([FromBody] EmailData data, SendingEmails sendingEmails) =>
{
    Console.WriteLine(data);
    sendingEmails.SendEmail(data);
    return "Email sent";
});

app.MapPost("/shipping", ([FromBody] ShippingData data) =>
{
    Console.WriteLine(data);
    return "30";
});

// app.MapPost("/order", ([FromBody] OrderData data, CreateOrder createOrder) =>
// {
//     Console.WriteLine(data);
//     createOrder.createOrderData(data);
//     return "Order placed";
// });

// Map controllers
app.MapControllers();

app.Run();
