package org.commerce.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;

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

}
