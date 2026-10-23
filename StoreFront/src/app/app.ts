import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu';
import { SearchComponent } from './components/search/search';
import { CartStatusComponent } from './components/cart-status/cart-status';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {}
