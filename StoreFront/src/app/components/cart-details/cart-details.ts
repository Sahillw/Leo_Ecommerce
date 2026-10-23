import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(): void {
    // Access cart items from cart service
    this.cartItems = this.cartService.cartItems;

    // Subscribe to cart total price
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // Subscribe to cart total quantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data),
    );

    // Compute cart totals
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem): void {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem): void {
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(theCartItem: CartItem): void {
    this.cartService.remove(theCartItem);
  }
}
