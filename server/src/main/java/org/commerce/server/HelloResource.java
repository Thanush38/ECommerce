package org.commerce.server;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.commerce.server.util.ImageReader;
import org.commerce.server.util.ProductReader;
import org.commerce.server.util.EmailServer;
import jakarta.ws.rs.core.Response;

@Path("/contents")
public class HelloResource {
    ProductReader reader = new ProductReader();
    ImageReader imageReader = new ImageReader();
    EmailServer emailServer = new EmailServer();
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }

    @GET
    @Path("/products")
    public String products() {
//        String data =  reader.readFileContents("Items/ItemsPractice.json");


        return reader.readFileContents("Items/ItemsPractice.json");

    }

    @GET
    @Path("/product")
    public String getProduct() {
        String data = reader.readFileContents("Items/ImplementVijay.json");
//
        String retData = imageReader.addImages(data);
        return retData;

//        return reader.readFileContents("Items/ImplementVijay.json");


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
    @Produces("application/json")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response contactEmail(String data) {
        String ret = emailServer.sendEmail(data);
        return Response.status(200)//return the presion value as a response object
                .header("Access-Control-Allow-Origin","*")
                .header("Content-Type", "application/json")
                .entity(ret).build();
    }


}