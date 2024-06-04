package org.commerce.server.util;
import org.json.JSONArray;
import org.json.JSONObject;

import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Base64;

public class ImageReader {
    ProductReader prodReader = new ProductReader();
    public String readImage(String filename) {
/**
         * if there is no '/' at the beginning, the following function call will return `null`
         */
        String f;
        if (filename.charAt(0) != '/') {
            f = '/' + filename;
        } else {
            f = filename;
        }

        /**
         * trying to open and read the file
         */

        try {
            System.out.println("before loading file");
            InputStream inputStream = getClass().getResourceAsStream(f);
            BufferedImage image = ImageIO.read(inputStream);
            byte[] imageBytes = convertImageToByteArray(image);
            String base64Image = encodeImageToBase64(imageBytes);
            System.out.println("after reading image");
            return base64Image;
        } catch (IOException e) {
            // something went wrong
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        }


    }

    public String readAllImages(String directory) {
        String f;
        if (directory.charAt(0) != '/') {
            f = '/' + directory;
        } else {
            f = directory;
        }
        JSONObject obj = new JSONObject();
        JSONArray arr = new JSONArray();
        try {
            InputStream inputStream = getClass().getResourceAsStream(f);
            URL imageDirectory = this.getClass().getClassLoader().getResource(f);
            File folder = new File(imageDirectory.toURI());
            File [] folders = folder.listFiles();
            for (File file : folders) {
                BufferedImage image = ImageIO.read(file);
                byte[] imageBytes = convertImageToByteArray(image);
                String base64Image = encodeImageToBase64(imageBytes);
                arr.put(base64Image);
            }
            obj.put("images", arr);
            return obj.toString();
        } catch (IOException e) {
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
    // to add the base 64 images to the json object
    public String addImages(String data){
        JSONObject obj = new JSONObject(data);
        obj = obj.getJSONArray("items").getJSONObject(0);

        String directory = obj.getString("imageLocation");

        JSONArray files = obj.getJSONArray("images");

        JSONArray images = new JSONArray();
        for (int i = 0; i < files.length(); i++) {
            String image = readImage(files.getString(i));
            image = "data:image/png;base64," + image;
            images.put(image);
        }

//        String images = readAllImages(directory);

        obj.put("imageCode", images);
        return obj.toString();

    }

    public BufferedImage readImageBuffered(InputStream stream) throws IOException {
        return ImageIO.read(stream);
    }
    public byte[] convertImageToByteArray(BufferedImage image) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos); // Specify the format: jpg, png, etc.
        baos.flush();
        return baos.toByteArray();
    }
    public String encodeImageToBase64(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    public static void main(String[] args) {
//        ImageReader ir = new ImageReader();
//        System.out.println(ir.readImage("Image/VijayExample/LeoVijay.jpg"));
        ProductReader reader = new ProductReader();
        String data = reader.readFileContents("Items/ImplementVijay.json");
        ImageReader imageReader = new ImageReader();
        String retData = imageReader.addImages(data);
        System.out.println(retData);
    }
}
