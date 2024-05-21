package org.commerce.server;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.commerce.server.util.ProductReader;

@Path("/images")
public class ImageServer {
    ProductReader reader = new ProductReader();
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }

    @GET
    @Path("/products")
    public String products() {
        return reader.readFileContents("Items/ItemsPractice.json");
    }
}
