package com.crm.service;

import com.crm.dto.SaleDto;
import com.crm.model.Customer;
import com.crm.model.Sale;
import com.crm.repository.CustomerRepository;
import com.crm.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<Sale> getAllSales() {
        List<Sale> sales = salesRepository.findAll();
        System.out.println("Fetched Sales: " + sales); // 👈 Debug log
        return sales;
    }
    

    public Sale saveSale(SaleDto saleDto) {
        Customer customer = customerRepository.findByNameIgnoreCase(saleDto.getCustomerName());

        if (customer == null) {
            throw new IllegalArgumentException("Customer with name " + saleDto.getCustomerName() + " not found.");
        }

        Sale sale = new Sale();
        sale.setCustomerId(customer.getCustomerId());
        sale.setUserId(saleDto.getUserId());
        sale.setCustomerName(saleDto.getCustomerName());
        sale.setProduct(saleDto.getProduct());
        sale.setAmount(saleDto.getAmount());
        sale.setStatus(saleDto.getStatus());
        sale.setCreatedAt(new Date());

        return salesRepository.save(sale);
    }

    public double calculateForecast() {
        List<Sale> sales = salesRepository.findAll();
        return sales.stream()
                .mapToDouble(s -> s.getAmount().doubleValue())
                .sum();
    }

    // ✅ Renamed method for clarity and controller alignment
    public void deleteSale(Long id) {
        if (!salesRepository.existsById(id)) {
            throw new IllegalArgumentException("Sale with ID " + id + " not found.");
        }
        salesRepository.deleteById(id);
    }
}
