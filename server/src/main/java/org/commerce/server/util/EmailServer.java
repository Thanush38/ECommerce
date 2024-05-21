package org.commerce.server.util;
import java.util.Properties;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.Authenticator;
import org.json.JSONObject;
import org.json.JSONArray;
public class EmailServer {
    ProductReader reader = new ProductReader();
    public String sendEmail(String data) {
        System.out.println("Email sent: " + data);

        return "Email sent";
    }

    public JSONObject getTokens(){
        reader.readFileContents("hidden/Mail.json");
    }
}
