package in.ashokit.service;

import in.ashokit.entity.CustomerEntity;
import in.ashokit.entity.OrderEntity;
import in.ashokit.entity.OrderItemEntity;
import in.ashokit.repo.CustomerRepository;
import in.ashokit.repo.OrderItemRepository;
import in.ashokit.repo.OrderRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderItemRepository orderItemRepository;
    private final EmailService emailService;

    public NotificationServiceImpl(OrderRepository orderRepository,
                                   CustomerRepository customerRepository,
                                   OrderItemRepository orderItemRepository,
                                   EmailService emailService) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.orderItemRepository = orderItemRepository;
        this.emailService = emailService;
    }

    @Override
    @Transactional(readOnly = true)
    public String sendOrderConfirmation(Integer orderId) {
        OrderEntity order = getOrder(orderId);
        CustomerEntity customer = resolveCustomer(order);
        String body = loadTemplate("templates/order-confirmation.html")
                .replace("{{customerName}}", safe(customer.getName()))
                .replace("{{orderId}}", String.valueOf(order.getOrderId()))
                .replace("{{trackingNumber}}", safe(order.getOrderTrackingNum()))
                .replace("{{orderStatus}}", safe(order.getOrderStatus()))
                .replace("{{paymentStatus}}", safe(order.getPaymentStatus()))
                .replace("{{totalPrice}}", order.getTotalPrice() == null ? "N/A" : order.getTotalPrice().toString());
        emailService.sendEmail(customer.getEmail(), "Order confirmation", body);
        return "Order confirmation email sent for order " + orderId;
    }

    @Override
    @Transactional(readOnly = true)
    public String sendCancellationNotification(Integer orderId) {
        OrderEntity order = getOrder(orderId);
        CustomerEntity customer = resolveCustomer(order);
        String body = loadTemplate("templates/order-cancelled.html")
                .replace("{{customerName}}", safe(customer.getName()))
                .replace("{{orderId}}", String.valueOf(order.getOrderId()))
                .replace("{{trackingNumber}}", safe(order.getOrderTrackingNum()))
                .replace("{{orderStatus}}", safe(order.getOrderStatus()));
        emailService.sendEmail(customer.getEmail(), "Order cancellation update", body);
        return "Cancellation notification email sent for order " + orderId;
    }

    @Override
    @Transactional(readOnly = true)
    public String sendDeliveryNotificationsForToday() {
        List<OrderEntity> orders = orderRepository.findByDeliveyDate(LocalDate.now());
        int sent = 0;
        for (OrderEntity order : orders) {
            try {
                CustomerEntity customer = resolveCustomer(order);
                String body = loadTemplate("templates/delivery-notification.html")
                        .replace("{{customerName}}", safe(customer.getName()))
                        .replace("{{trackingNumber}}", safe(order.getOrderTrackingNum()))
                        .replace("{{deliveryDate}}", String.valueOf(order.getDeliveyDate()));
                emailService.sendEmail(customer.getEmail(), "Delivery update for your order", body);
                sent++;
            } catch (RuntimeException ex) {
                // Continue with other orders; the returned count reflects successful sends.
            }
        }
        return "Delivery notifications sent: " + sent + " of " + orders.size();
    }

    @Override
    @Transactional(readOnly = true)
    public String sendOfferNotifications() {
        List<CustomerEntity> customers = customerRepository.findAll();
        int sent = 0;
        for (CustomerEntity customer : customers) {
            if (customer.getEmail() == null || customer.getEmail().isBlank()) {
                continue;
            }
            try {
                String body = loadTemplate("templates/offer.html")
                        .replace("{{customerName}}", safe(customer.getName()));
                emailService.sendEmail(customer.getEmail(), "A special offer for you", body);
                sent++;
            } catch (RuntimeException ex) {
                // Continue with other customers if one email fails.
            }
        }
        return "Offer emails sent: " + sent + " of " + customers.size();
    }

    private OrderEntity getOrder(Integer orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
    }

    private CustomerEntity resolveCustomer(OrderEntity order) {
        if (order.getCustomer() != null) {
            return order.getCustomer();
        }
        if (order.getCustomerEmail() != null && !order.getCustomerEmail().isBlank()) {
            return customerRepository.findByEmail(order.getCustomerEmail())
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found for order " + order.getOrderId()));
        }
        throw new IllegalArgumentException("Order has no customer or customer email: " + order.getOrderId());
    }

    private String loadTemplate(String path) {
        try {
            return new String(new ClassPathResource(path).getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to load email template: " + path, ex);
        }
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
