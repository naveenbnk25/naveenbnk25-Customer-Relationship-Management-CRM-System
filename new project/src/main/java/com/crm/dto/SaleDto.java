package com.crm.dto;

import java.math.BigDecimal;

public class SaleDto {

    private Long userId;
    private Long customerId;       // Add customerId field

    private String customerName;
    private String product;
    private BigDecimal amount;
    private String status;

    public SaleDto() {
    }

    public SaleDto(Long customerId,Long userId, String customerName, String product, BigDecimal amount, String status) {
        this.userId = userId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.product = product;
        this.amount = amount;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public BigDecimal getAmount() {
        return amount;
    }


    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
