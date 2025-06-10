package com.crm.controller;

import com.crm.model.Report;
import com.crm.model.User;
import com.crm.repository.ReportRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        if (report.getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        // Fetch the actual User object using the transient userId
        User user = userRepository.findById(report.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set the user reference (so Hibernate can persist it)
        report.setUser(user);

        report.setCreatedAt(LocalDateTime.now());
        return reportRepository.save(report);
    }

    // Fetch all reports (with no deletion)
    @GetMapping
    public List<Report> getAllReports() {
        return reportRepository.findByDeletedAtIsNull();
    }

    // Delete a report by ID
    @DeleteMapping("/{id}")
    public String deleteReport(@PathVariable Long id) {
        reportRepository.deleteById(id);
        return "Report deleted successfully.";
    }
}
