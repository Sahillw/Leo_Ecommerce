import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerDto } from '../../dto/customer-dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {
  loggedUser: CustomerDto | null = null;
  cartItemCount = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

  isLoggedIn(): boolean {
    return this.authService.getLoggedUser() !== null;
  }

  onLogout(): void {
    this.authService.logout();
    this.loggedUser = null;
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}
