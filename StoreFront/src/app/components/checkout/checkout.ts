import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout';
import { PaymentService } from '../../services/payment';
import { Purchaseorder } from '../../dto/purchaseorder';
import { Customer } from '../../dto/customer';
import { Address } from '../../dto/address';
import { Order } from '../../dto/order';
import { Orderitems } from '../../dto/orderitems';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [''],
        email: [''],
        phno: [''],
      }),
      shippingAddress: this.formBuilder.group({
        hno: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
    });
  }

  reviewCartDetails(): void {
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data),
    );

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
  }

  onSubmit(): void {
    console.log('Purchase button clicked!');

    let orderDto = new Order(this.totalQuantity, this.totalPrice);
    const cartItems = this.cartService.cartItems;
    let orderItemDtoList: Orderitems[] = cartItems.map(
      (tempCartItem) => new Orderitems(tempCartItem),
    );

    const customerFormValues =
      this.checkoutFormGroup.controls['customer'].value;
    const addressFormValues =
      this.checkoutFormGroup.controls['shippingAddress'].value;

    let purchase = new Purchaseorder();

    purchase.customerDto = new Customer(
      customerFormValues.name,
      customerFormValues.email,
      customerFormValues.phno,
    );

    purchase.addressDto = new Address(
      addressFormValues.street,
      addressFormValues.city,
      addressFormValues.state,
      addressFormValues.zipCode,
      addressFormValues.hno,
    );

    purchase.orderDto = orderDto;
    purchase.orderItemDtoList = orderItemDtoList;

    // Make backend API call to create order
    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        const responseData = response.data;
        const razorpayOrderId = responseData.razorpayOrderId;
        const trackingNum = responseData.orderTrackingNumber; // Extract tracking number

        // Open Razorpay payment gateway modal
        this.paymentService.processPayment(
          razorpayOrderId,
          trackingNum, // Passed tracking number to handle DB update callback
          this.totalPrice,
          customerFormValues.email,
          customerFormValues.phno,
          () => {
            // On Payment Success: clear cart and navigate
            this.cartService.clearCart();
            this.router.navigateByUrl('/order-confirmation');
          },
        );
      },
      error: (err) => {
        console.error('Order creation failed:', err);
        alert('Could not create order. Check console.');
      },
    });
  }

  onPaymentSuccess(paymentResponse: any): void {
    console.log('Payment Successful:', paymentResponse);
    alert('Payment Successful! Order Confirmed.');

    this.cartService.clearCart();
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/order-confirmation');
  }
}
