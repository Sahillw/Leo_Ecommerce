import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerDto } from '../../dto/customer-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  customer: CustomerDto = {
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    pwdUpdated: 'No',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.customer).subscribe({
      next: (response: any) => {
        this.successMessage =
          'Registration successful! Temporary password sent to your email.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        this.errorMessage =
          err.error?.message || 'Registration failed. Email may already exist.';
      },
    });
  }
}
