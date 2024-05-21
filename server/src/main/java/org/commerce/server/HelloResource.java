package org.commerce.server;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.commerce.server.util.ProductReader;
import org.commerce.server.util.EmailServer;

@Path("/contents")
public class HelloResource {
    ProductReader reader = new ProductReader();
    EmailServer emailServer = new EmailServer();
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

    @GET
    @Path("/products/{id}")
    public String product(@PathParam("id") String id) {
        String data =  reader.readFileContents("Items/ItemsPractice.json", id);
        if (data == null) {
            return "Product not found";
        }
        return data;

    }

    @POST
    @Path("/contactemail")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String contactEmail(String data) {
        return emailServer.sendEmail(data);
    }


}