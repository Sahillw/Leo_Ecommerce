import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-items';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts(): void {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    this.currentCategoryId = hasCategoryId
      ? +this.route.snapshot.paramMap.get('id')!
      : 1;

    this.productService
      .getProductsByCategoryId(this.currentCategoryId)
      .subscribe({
        next: (res) => {
          this.products = res.data || [];
        },
        error: (err) => {
          console.error('API Error:', err);
          this.products = [];
        },
      });
  }

  handleSearchProducts(): void {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe({
      next: (res) => {
        this.products = res.data || [];
      },
      error: (err) => {
        console.error('Search API Error:', err);
        this.products = [];
      },
    });
  }

  addToCart(theProduct: Product): void {
    // AUTH CHECK: Verify session before adding item
    if (!this.authService.getLoggedUser()) {
      alert('Please log in first to add products to your cart.');
      this.router.navigate(['/login']);
      return;
    }

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
