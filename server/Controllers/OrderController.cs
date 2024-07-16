using Microsoft.AspNetCore.Mvc;
using Utils;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BodyTypesController : ControllerBase
    {
        [HttpPost]
        [Route("order")]
        public string HandleOrder([FromBody] string content)
        {
            CreateOrder createOrder = new CreateOrder();
            Console.WriteLine(content);
            createOrder.createOrderData(content);
            return content;
        }
    }
}