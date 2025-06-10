package com.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   // Generates getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Generates a no-args constructor
@AllArgsConstructor // Generates an all-args constructor
public class NotificationDto {

    private String type;         // The notification type: "EMAIL" or "SMS"
    private String message;      // The notification message
    private Long userId;         // Sender ID
    private Long recipientId;    // Recipient user ID
    private String status;       // Status of the notification (unread, read, archived)

}
