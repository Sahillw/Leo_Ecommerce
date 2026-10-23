import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerDto } from '../../dto/customer-dto'; // or '../../dto/customer' depending on which file you want to use

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  credentials: CustomerDto = {
    email: '',
    password: '',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          const user = response.data;

          // Check if user is logging in with temporary password
          if (user.pwdUpdated === 'NO' || user.pwdUpdated === 'No') {
            // Redirect to reset password page passing email
            this.router.navigate(['/reset-password'], {
              queryParams: { email: user.email },
            });
          } else {
            // Normal login success -> save session and navigate to storefront/checkout
            this.authService.saveUserSession(user);
            this.router.navigate(['/products']);
          }
        } else {
          this.errorMessage = response.msg || 'Invalid Credentials';
        }
      },
      error: (err) => {
        this.errorMessage =
          err.error?.msg || 'Invalid Email or Temporary Password';
      },
    });
  }
}
