package com.crm.repository;

import com.crm.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SalesRepository extends JpaRepository<Sale, Long> {
  // Optional: Find all sales by user ID
List<Sale> findByUserId(Long userId);

// Optional: Find all sales by customer ID
List<Sale> findByCustomerId(Long customerId);


}
