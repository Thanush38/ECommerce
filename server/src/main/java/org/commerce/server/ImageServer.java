package org.commerce.server;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import org.commerce.server.util.ImageReader;

@Path("/images")
public class ImageServer {
    ImageReader reader = new ImageReader();

    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }

    @GET
    @Path("/{id}")
    public String getImage(@PathParam("id") String id) {
        String data =  reader.readImage("Images/" + id);
        return data;
    }

    @GET
    @Path("/vijay")
    public String getVijayImage() {
        String data =  reader.readAllImages("Images/VijayExample");

        //put that into a json object
          return data;
    }
}
