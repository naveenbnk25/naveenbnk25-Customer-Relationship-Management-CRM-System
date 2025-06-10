package com.crm.controller;

import com.crm.dto.SaleDto;
import com.crm.model.Sale;
import com.crm.service.SalesService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {

    @Autowired
    private SalesService salesService;

    // ✅ Add a new sale with validation
    @PostMapping("/add")
    public ResponseEntity<?> addSale(@RequestBody SaleDto saleDto) {
        if (saleDto.getCustomerName() == null || saleDto.getCustomerName().trim().isEmpty()) {
            return new ResponseEntity<>("Customer name is required", HttpStatus.BAD_REQUEST);
        }

        try {
            Sale sale = salesService.saveSale(saleDto);
            return new ResponseEntity<>(sale, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testRoute() {
        return ResponseEntity.ok("Sales route is working!");
    }
    
    @PostConstruct
public void init() {
    System.out.println("✅ SaleController is loaded and active");
}


    // ✅ Get all sales - main route used by frontend
    @GetMapping
    public ResponseEntity<List<Sale>> getSales() {
        return ResponseEntity.ok(salesService.getAllSales());
    }

    // Optional: Keep /all route if needed elsewhere
    @GetMapping("/all")
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(salesService.getAllSales());
    }

    // ✅ Delete sale by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable Long id) {
        salesService.deleteSale(id); // make sure service uses this name
        return ResponseEntity.ok("Sale deleted successfully.");
    }

    // Optional: Forecast route
    @GetMapping("/forecast")
    public ResponseEntity<Double> getForecast() {
        return ResponseEntity.ok(salesService.calculateForecast());
    }
}
