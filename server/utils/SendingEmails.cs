using WebApplication1.Models;

namespace Utils;
using System.Net;
using System.Net.Mail;
using Newtonsoft.Json;
class SendingEmails
{
    
    public void SendEmail(String name, string email, string message)
    {
        
        var client = new SmtpClient("live.smtp.mailtrap.io", 587)
        {
            Credentials = new NetworkCredential("api", "78b3b93f8bff8e027255b8b8af57ad0f"),
            EnableSsl = true
        };
        string totalMessage = "Name: " + name + "\nEmail: " + email + "\nMessage: " + message;
        client.Send("mailtrap@demomailtrap.com", "shadowposters@gmail.com", email, totalMessage);
        System.Console.WriteLine(name);
        System.Console.WriteLine(email);
        System.Console.WriteLine(message);
    }
    public void SendEmail(EmailData data)
    {
        
        
        var client = new SmtpClient("live.smtp.mailtrap.io", 587)
        {
            Credentials = new NetworkCredential("api", "78b3b93f8bff8e027255b8b8af57ad0f"),
            EnableSsl = true
        };
        string totalMessage = "Name: " + data.Name + "\nEmail: " + data.Email + "\nMessage: " + data.Message;
        client.Send("mailtrap@demomailtrap.com", "shadowposters@gmail.com", data.Email, totalMessage);
        System.Console.WriteLine(data.Name);
        System.Console.WriteLine(data.Email);
        System.Console.WriteLine(data.Message);
    }
}