package org.commerce.server.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;

import jakarta.json.stream.JsonParser;
import org.json.JSONObject;
import org.json.JSONArray;


public class ProductReader {
    public String readFileContents(String filename) {
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
//            java.nio.file.Path file = java.nio.file.Path.of(
//                    StudentResource.class.getResource(f)
//                            .toString()
//                            .substring(6));
            //read files from resources folder
            InputStream inputStream = getClass().getResourceAsStream(f);
            BufferedReader reader = new BufferedReader(new java.io.InputStreamReader(inputStream));
            System.out.println("After loading file");
            String total = "";
            String line;
            while((line = reader.readLine()) != null){
                total +=line+"\n";
            }
            return total;
        } catch (IOException e) {
            // something went wrong
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        }


    }

    public String readFileContents(String filename, String search) {
        String f;
        if (filename.charAt(0) != '/') {
            f = '/' + filename;
        } else {
            f = filename;
        }
        String total = "";

        /**
         * trying to open and read the file
         */
        try {
            System.out.println("before loading file");
//            java.nio.file.Path file = java.nio.file.Path.of(
//                    StudentResource.class.getResource(f)
//                            .toString()
//                            .substring(6));
            //read files from resources folder
            InputStream inputStream = getClass().getResourceAsStream(f);
            BufferedReader reader = new BufferedReader(new java.io.InputStreamReader(inputStream));
            System.out.println("After loading file");

            String line;
            while((line = reader.readLine()) != null){
                total +=line+"\n";
            }
        } catch (IOException e) {
            // something went wrong
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        }
        JSONObject filtered = new JSONObject();
        JSONObject obj = new JSONObject(total);
        JSONArray arrValues = obj.getJSONArray("items");
        for (int i = 0; i < arrValues.length(); i++) {
            JSONObject item = arrValues.getJSONObject(i);
            JSONArray keyWordsArray = item.getJSONArray("keyWords");
            for (int j = 0; j < keyWordsArray.length(); j++) {
                if (keyWordsArray.getString(j).contains(search)) {
                    filtered.append("items", item);
                    break; // Break out of the inner loop since we found a match
                }
            }
        }



        return filtered.toString();
    }

    public String calculateShipping(String data) {
        JSONObject obj = new JSONObject(data);
        //Find out how to calculate shipping


        obj.put("shipping", 30);
        return obj.toString();
    }



}
