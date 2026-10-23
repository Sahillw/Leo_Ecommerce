# Notification API

Spring Boot 3.5.7 / Java 17 service for the e-commerce reference APIs.

## Features
- Order confirmation email
- Order cancellation email
- Delivery emails for orders whose `delivey_date` is today
- Offer emails to customers

## Important schema check
This implementation follows the Customer/Order API version that uses:
- `customer` (`customer_id`, `name`, `email`, `phone_no`, ...)
- `shipping_addr` (`addr_id`, `customer_id`, `hno`, `street`, ...)
- `orders` (`order_id`, `customer_id`, `addr_id`, `customer_email`, `delivey_date`, ...)
- `order_items` (`item_id`, `order_id`, `product_name`, ...)

The Notification API reads existing tables. It does not create/own them. Before running, compare each `@Column` and `@JoinColumn` against the exact DDL produced by your Customer and Order APIs. In particular, the reference Order API spells the Java field `deliveyDate`; the column is mapped here as `delivey_date`.

## Configure
Set environment variables:
- `DB_URL` (default `jdbc:mysql://localhost:3306/ashokit_ecomm`)
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_USERNAME`
- `MAIL_PASSWORD` (use an SMTP/app password, never commit it)

For Gmail, configure a Google app password. Do not put real credentials in source control.

## Run
```bash
mvn clean spring-boot:run
```

Swagger UI: `http://localhost:8084/swagger-ui.html`

## Endpoints
- `POST /api/notifications/orders/{orderId}/confirmation`
- `POST /api/notifications/orders/{orderId}/cancellation`
- `POST /api/notifications/deliveries/today`
- `POST /api/notifications/offers`

This version intentionally starts with REST-triggered email notifications. Kafka and WhatsApp/DoubleTick should be added after the basic email/database integration has been tested. Do not reuse any API key found in old source dumps; rotate it if it was real.
