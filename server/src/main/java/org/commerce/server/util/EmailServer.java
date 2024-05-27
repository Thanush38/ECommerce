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

//import javax.mail.Message;
//import javax.mail.MessagingException;
//import javax.mail.PasswordAuthentication;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import javax.mail.Authenticator;


import org.json.JSONObject;
public class EmailServer {
    ProductReader reader = new ProductReader();
    public String sendEmail(String data) {
        System.out.println("Email sent: " + data);

        JSONObject incoming = new JSONObject(data);
        JSONObject tokens = getTokens();
        tokens = tokens.getJSONObject("data");



        String to = tokens.get("to").toString();
        //provide sender's email ID
        String from = "mailtrap@demomailtrap.com";
        //provide Mailtrap's username
        final String username = tokens.get("user").toString();
        //provide Mailtrap's password
        final String password = tokens.get("password").toString();
        //provide Mailtrap's host address
        String host = "send.smtp.mailtrap.io";
        //configure Mailtrap's SMTP server details
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", tokens.getString("host"));
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        //create the Session object
        Authenticator authenticator = new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        };
        Session session = Session.getInstance(props, authenticator);
        try {
            //create a MimeMessage object
            Message message = new MimeMessage(session);
            //set From email field
            message.setFrom(new InternetAddress(from));
            //set To email field
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(to));
            //set email subject field
            message.setSubject("New Message From Shadow Posters Website");
            //set the content of the email message
            message.setContent(EmailContent(incoming), "text/html");
            //send the email message
            Transport.send(message);
            System.out.println("Email Message Sent Successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }



        return "Email sent";
    }

    public JSONObject getTokens(){
        String tokens = reader.readFileContents("hidden/Mail.json");
        JSONObject obj = new JSONObject(tokens);
        return obj;

    }


    public String EmailContent(JSONObject data){
        String content = "<h1>New Email From " + data.getString("name") + "</h1>";
        content += "<p>Email: " + data.getString("email") + "</p>";
        content += "<p>Message: " + data.getString("message") + "</p>";
        return content;

    }

    public static void main(String[] args) {
        EmailServer server = new EmailServer();
        String dummy = "{\"name\":\"John Doe\",\"email\":\"thanush38@outlook.com\",\"message\":\"bandard\"}";
        server.sendEmail(dummy);
    }


}
