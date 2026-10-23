export class PaymentCallback {
  constructor(
    public razorpayOrderId: string,
    public razorpayPaymentId: string,
    public orderTrackingNum?: string,
    public orderStatus?: string,
    public paymentStatus?: string,
    public razorpaySignature?: string,
  ) {}
}
