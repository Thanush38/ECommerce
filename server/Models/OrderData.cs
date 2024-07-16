namespace server.Models
{
    public class OrderData
    {
        public string Id { get; set; }
        public Delivery Delivery { get; set; }
        public Cart Cart { get; set; }
        public OrderDetails OrderDetails { get; set; }
        public Pricing Pricing { get; set; }
    }

    public class Delivery
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }

    public class Cart
    {
        public List<Item> Items { get; set; }
    }

    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
    }

    public class OrderDetails
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CardNumber { get; set; }
        public string CardHolder { get; set; }
        public string Expires { get; set; }
        public string CVC { get; set; }
    }

    public class Pricing
    {
        public string Total { get; set; }
        public string Shipping { get; set; }
        public string Tax { get; set; }
        public string Subtotal { get; set; }
        public bool FoundShipping { get; set; }
    }
}
