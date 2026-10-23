import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResetPwdDto } from '../../dto/reset-pwd_dto';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPwdDto: ResetPwdDto = {
    email: '',
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Extract target email from query params
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.resetPwdDto.email = params['email'];
      }
    });
  }

  onResetPassword(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.resetPwdDto.newPwd !== this.resetPwdDto.confirmPwd) {
      this.errorMessage = 'New password and confirm password do not match.';
      return;
    }

    this.authService.resetPassword(this.resetPwdDto).subscribe({
      next: (response) => {
        this.successMessage =
          'Password updated successfully! Redirecting to products...';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message ||
          'Failed to update password. Please check your temporary password.';
      },
    });
  }
}
