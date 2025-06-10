package com.crm.service;

import com.crm.dto.NotificationDto;
import com.crm.model.Customer;
import com.crm.model.Notification;
import com.crm.model.User;
import com.crm.repository.CustomerRepository;
import com.crm.repository.NotificationRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SmsService smsService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public void sendNotification(NotificationDto dto) {
        // Determine type (EMAIL or SMS) and send accordingly
        User sender = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Customer recipient = customerRepository.findById(dto.getRecipientId())
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        if (dto.getType().equalsIgnoreCase("EMAIL")) {
            sendEmail(recipient.getEmail(), dto.getMessage());
        } else if (dto.getType().equalsIgnoreCase("SMS")) {
            smsService.sendSms(recipient.getPhone(), dto.getMessage());
        } else {
            throw new IllegalArgumentException("Invalid notification type: " + dto.getType());
        }

        // Find sender and recipient from the database


        // Create and save notification
        Notification notification = new Notification();
        notification.setUser(sender);                // sender
        notification.setMessage(dto.getMessage());
        notification.setStatus(Notification.Status.unread); // Default status
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRecipient(recipient);         // recipient

        notificationRepository.save(notification);
    }

    private void sendEmail(String to, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject("CRM Notification");
        mailMessage.setText(message);
        javaMailSender.send(mailMessage);
    }
}
