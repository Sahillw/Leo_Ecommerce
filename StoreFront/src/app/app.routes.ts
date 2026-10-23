import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { CartDetailsComponent } from './components/cart-details/cart-details';
import { RegisterComponent } from './components/register/register';
import { CheckoutComponent } from './components/checkout/checkout';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation';
import { LoginComponent } from './components/Login/login';
import { ResetPasswordComponent } from './components/reset-password/reset-password';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },

  {
    path: 'cart-details',
    component: CartDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  {
    path: 'order-confirmation',
    component: OrderConfirmationComponent,
    canActivate: [authGuard],
  },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
