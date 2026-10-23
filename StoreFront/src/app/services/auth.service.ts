import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDto } from '../dto/customer-dto';
import { ResetPwdDto } from '../dto/reset-pwd_dto';
import { ApiResponse } from '../dto/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Point to 102_Customer_Api running on Port 8082
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  /**
   * Customer Login Endpoint (/login)
   * Validates email & password, returns user info + pwdUpdated flag ("Yes" / "No")
   */
  login(customerDto: CustomerDto): Observable<ApiResponse<CustomerDto>> {
    return this.http.post<ApiResponse<CustomerDto>>(
      `${this.baseUrl}/login`,
      customerDto,
    );
  }

  /**
   * Primary Registration Method (/customer)
   * Sends customer payload to backend and triggers temporary password email via SMTP
   */
  register(customerDto: CustomerDto): Observable<ApiResponse<CustomerDto>> {
    return this.http.post<ApiResponse<CustomerDto>>(
      `${this.baseUrl}/customer`,
      customerDto,
    );
  }

  /**
   * Alias for register() to fix registerComponent calls
   */
  registerUser(customerDto: CustomerDto): Observable<any> {
    return this.register(customerDto);
  }

  /**
   * Password Reset Endpoint (/reset-pwd)
   * Takes temporary password + new password and updates user state (pwdUpdated = "Yes")
   */
  resetPassword(resetPwdDto: ResetPwdDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/reset-pwd`,
      resetPwdDto,
    );
  }

  // ==========================================
  // Session & Local Storage Helper Methods
  // ==========================================

  saveUserSession(user: CustomerDto): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser(): CustomerDto | null {
    const userStr = localStorage.getItem('loggedUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }
}
