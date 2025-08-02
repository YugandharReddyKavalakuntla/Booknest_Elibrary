package com.booknest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${app.reset-password.path:/reset-password}") // Optional override
    private String resetPath;

    @Value("${spring.mail.username}") // To set From address dynamically
    private String senderEmail;

    public void sendResetEmail(String to, String token) {
        String resetUrl = frontendUrl + resetPath + "/" + token;

        String body = String.format("""
                Hello,

                We received a password reset request for your BookNest account.
                Click the link below to reset your password:

                %s

                This link will expire in 15 minutes.

                If you didn’t request this, you can ignore this message.

                — BookNest Team
                """, resetUrl);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("📚 BookNest Password Reset");
        message.setText(body);
        message.setFrom(senderEmail); // Uses the same email as configured in SMTP

        mailSender.send(message);
    }
}



//
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class EmailService {
//
//    private final JavaMailSender mailSender;
//
//    public void sendResetEmail(String to, String token) {
//        String resetUrl = "https://booknest.com/reset-password/" + token;
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("📚 BookNest Password Reset");
//        message.setText("""
//                Hello,
//
//                We received a password reset request for your BookNest account.
//                Please click the link below to reset your password:
//
//                %s
//
//                This link will expire in 15 minutes.
//
//                If you didn't request a reset, you can ignore this message.
//
//                Thanks,
//                BookNest Team
//                """.formatted(resetUrl)
//        );
//        message.setFrom("your_email@gmail.com");
//
//        mailSender.send(message);
//    }
//}
//

//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class EmailService {
//    private final JavaMailSender mailSender;
//
//    public void sendResetEmail(String to, String token) {
//        String resetUrl = "https://booknest.com/reset-password/" + token;
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("BookNest Password Reset");
//        message.setText("Click the link to reset your password:\n" + resetUrl);
//        message.setFrom("shreevidhyaganapathi2024@gmail.com");
//
//        mailSender.send(message);
//    }
//}

