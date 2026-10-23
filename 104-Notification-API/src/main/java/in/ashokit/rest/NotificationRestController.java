package in.ashokit.rest;

import in.ashokit.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationRestController {
    private final NotificationService notificationService;

    public NotificationRestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/orders/{orderId}/confirmation")
    public ResponseEntity<String> sendOrderConfirmation(@PathVariable Integer orderId) {
        return ResponseEntity.ok(notificationService.sendOrderConfirmation(orderId));
    }

    @PostMapping("/orders/{orderId}/cancellation")
    public ResponseEntity<String> sendCancellation(@PathVariable Integer orderId) {
        return ResponseEntity.ok(notificationService.sendCancellationNotification(orderId));
    }

    @PostMapping("/deliveries/today")
    public ResponseEntity<String> sendDeliveriesToday() {
        return ResponseEntity.ok(notificationService.sendDeliveryNotificationsForToday());
    }

    @PostMapping("/offers")
    public ResponseEntity<String> sendOffers() {
        return ResponseEntity.ok(notificationService.sendOfferNotifications());
    }
}
