import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  get isAdmin(): boolean {
    return this.authService.getCurrentUser()?.role === 'admin';
  }

  logout() {
    this.authService.logout();
  }
}