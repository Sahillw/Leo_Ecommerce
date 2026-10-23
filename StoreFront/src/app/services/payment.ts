import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentCallback } from '../dto/payment-callback';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private RAZORPAY_KEY = 'rzp_test_TrHevKGvKrxk05';

  constructor(private httpClient: HttpClient) {}

  processPayment(
    orderId: string,
    trackingNum: string,
    amount: number,
    customerEmail: string,
    customerPhone: string,
    successCallback?: (response: any) => void,
  ): void {
    const options: any = {
      key: this.RAZORPAY_KEY,
      amount: Math.round(amount * 100),
      currency: 'INR',
      name: 'StoreFront E-Commerce',
      description: 'Order Payment',
      order_id: orderId,
      handler: (response: any) => {
        if (response && response.razorpay_payment_id) {
          const paymentPayload = new PaymentCallback(
            orderId,
            response.razorpay_payment_id,
            trackingNum,
            response.razorpay_signature,
          );

          this.paymentCallBack(paymentPayload, successCallback, response);
        }
      },
      prefill: {
        name: 'Customer',
        email: customerEmail,
        contact: customerPhone,
      },
      theme: {
        color: '#0f172a',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  paymentCallBack(
    paymentCallback: PaymentCallback,
    successCallback?: Function,
    rawResponse?: any,
  ): void {
    this.httpClient
      .put<any>('http://localhost:8081/order', paymentCallback)
      .subscribe({
        next: (response) => {
          console.log('Payment callback & update success:', response);
          if (successCallback) {
            successCallback(rawResponse);
          }
        },
        error: (error) => console.error('Payment callback failed:', error),
      });
  }
}
