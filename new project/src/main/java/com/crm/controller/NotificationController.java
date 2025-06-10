package com.crm.controller;

import com.crm.model.Customer;
import com.crm.model.Notification;
import com.crm.model.User;
import com.crm.dto.NotificationDto;
import com.crm.repository.CustomerRepository;
import com.crm.repository.NotificationRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // ✅ Send notification (Email/SMS stored in DB)
    @PostMapping("/send")
    public Notification sendNotification(@RequestBody NotificationDto notificationDto) {
        Optional<User> sender = userRepository.findById(notificationDto.getUserId());
        Optional<Customer> recipient = customerRepository.findById(notificationDto.getRecipientId());

        // Check if sender or recipient exists
        if (sender.isEmpty() || recipient.isEmpty()) {
            throw new IllegalArgumentException("User or recipient not found");
        }

        // Convert the status to an enum
        Notification.Status status = Notification.Status.unread;
        String statusStr = notificationDto.getStatus();
        if (statusStr != null && !statusStr.isEmpty()) {
            try {
                status = Notification.Status.valueOf(statusStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status: " + statusStr);
            }
        }

        // Create a new notification and set its fields
        Notification notification = new Notification();
        notification.setUser(sender.get());               // Set the sender (user)
        notification.setRecipient(recipient.get());       // Set the recipient (user)
        notification.setMessage(notificationDto.getMessage());  // Set the message
        notification.setStatus(status);                   // Set status (unread, read, archived)
        notification.setCreatedAt(LocalDateTime.now());   // Set the creation timestamp
        // The type is not stored in the DB, but we can set it to the notification before saving it.
        notification.setType(notificationDto.getType()); // Set the type (Email/SMS)

        // Save the notification to the database
        return notificationRepository.save(notification);
    }

    // ✅ Get all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        try {
            List<Notification> notifications = notificationRepository.findAll();

            // We can set the type for each notification dynamically before returning the response
            for (Notification notification : notifications) {
                // You can set the type dynamically if needed, here we just set it based on the status or message
                // Example logic: if the message contains a specific word, set the type
                if (notification.getMessage().contains("Email")) {
                    notification.setType("EMAIL");
                } else if (notification.getMessage().contains("SMS")) {
                    notification.setType("SMS");
                } else {
                    notification.setType("Unknown");
                }
            }

            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            System.err.println("Error fetching notifications: " + e.getMessage());
            e.printStackTrace();  // Print stack trace to the console/log
            return ResponseEntity.status(500).body(null);  // Return 500 error
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testNotificationRoute() {
        return ResponseEntity.ok("Notification Controller is working!");
    }

    // ✅ Delete a notification
    @DeleteMapping("/delete/{id}")
    public String deleteNotification(@PathVariable Long id) {
        if (!notificationRepository.existsById(id)) {
            return "Notification not found";
        }
        notificationRepository.deleteById(id);
        return "Notification deleted successfully";
    }
}
