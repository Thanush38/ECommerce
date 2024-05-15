package org.commerce.server;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;

@Path("/contents")
public class HelloResource {
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

    @GET
    @Path("/products/{id}")
    public String product(@PathParam("id") String id) {
        String data =  reader.readFileContents("Items/ItemsPractice.json", id);
        if (data == null) {
            return "Product not found";
        }
        return data;

    }


}