import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css',
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(): void {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data),
    );
  }
}
