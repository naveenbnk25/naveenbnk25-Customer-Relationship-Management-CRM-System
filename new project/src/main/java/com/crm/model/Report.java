package com.crm.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    // Relating Report to User Entity
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // User entity is related here

    @Column(name = "report_type", nullable = false)
    private String reportType;

    @Column(name = "filters_used", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String filtersUsed;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(nullable = false)
    private String title;

    @Column(name = "file_path")
    private String filePath;

    @Setter
    @Transient
    private Long userId;

    public Long getUserId() {
        return user != null ? user.getUserId() : userId;
    }


}
