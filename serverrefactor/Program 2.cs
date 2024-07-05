using Utils;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:3000",
                    "http://localhost:8081")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
DataReader dataReader = new DataReader();
SendingEmails sendingEmails = new SendingEmails();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
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

app.UseCors(MyAllowSpecificOrigins); // Ensure CORS middleware is placed correctly

app.UseAuthorization();

app.MapGet("/", () => "hello world");

app.MapGet("/products", () =>
{
    return dataReader.ReadData();
});

app.MapGet("/products/{id}", (string id) =>
{
    return dataReader.ReadData(id);
});

app.MapGet("/shipping", () =>
{
    return 30;
});

// for reading the images and return as a byte array
app.MapGet("/product/{id}", (string id) =>
{
    string data = dataReader.ReadAllImages(id);
    return data;
});



// app.MapPost("/sendemail", (string name, string email, string message) =>
// {
//     sendingEmails.SendEmail(name, email, message);
//     return "Email sent";
// });

app.MapPost("/sendemail", ([FromBody] EmailData data) =>
{
    Console.WriteLine(data);
    sendingEmails.SendEmail(data);
    return "Email sent";
});

app.MapControllers();

app.Run();