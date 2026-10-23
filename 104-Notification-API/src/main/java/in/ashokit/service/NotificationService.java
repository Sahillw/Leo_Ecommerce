package in.ashokit.service;

public interface NotificationService {
    String sendOrderConfirmation(Integer orderId);
    String sendCancellationNotification(Integer orderId);
    String sendDeliveryNotificationsForToday();
    String sendOfferNotifications();
}
