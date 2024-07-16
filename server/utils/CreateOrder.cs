using server.Models;

namespace Utils;


using Newtonsoft.Json.Linq;


using System.Net;
using System.Net.Mail;
using Newtonsoft.Json;

class CreateOrder
{
    public void createOrderData(string data)
    {
        
        // string strData = JToken.Parse(data).ToString();
        // Console.WriteLine(strData);
        data = data.Replace("\\", "");
        var orderData = JsonConvert.DeserializeObject(data);
        
        Console.WriteLine(orderData);
        
        var client = new SmtpClient("live.smtp.mailtrap.io", 587)
        {
            Credentials = new NetworkCredential("api", "78b3b93f8bff8e027255b8b8af57ad0f"),
            EnableSsl = true
        };
        String totalMessage = orderData.ToString();
        
        
        client.Send("mailtrap@demomailtrap.com", "shadowposters@gmail.com", "Shadow Posters New Order", totalMessage);
    }
    
}