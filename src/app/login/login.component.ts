import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loginError: string = '';
  showPassword: boolean = false;
  isDarkMode = false;

  // Simulated database of users (Email + Password)
  usersDB: { email: string, password: string }[] = [
    { email: 'admin@example.com', password: 'Admin@123' },
    { email: 'test@example.com', password: 'Test@456' },
    { email: 'sciAdmin123@example.com', password: 'sci' },
    { email: 'john@example.com', password: 'John@789' }
  ];

  constructor(private fb: FormBuilder, private router: Router,private themeService: ThemeService, private http: HttpClient , private authservice:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.themeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.loginError = '';

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Find user in local array (simulated database)
    // const user = this.usersDB.find(u => u.email === email);

    const loginData = { email, password };

    // if (!user) {
    //   this.f['email'].setErrors({ notFound: true });
    //   return;
    // }

    // if (user.password !== password) {
    //   this.f['password'].setErrors({ incorrectPassword: true });
    //   return;
    // }

    this.http.post<any>(`${this.authservice.baseUrl}/api/auth/login`, loginData)
    .subscribe({
      next: (response) => {
        // ✅ Save token to localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('email', email); // Optional

        console.log('Login successful:', response);
        this.authservice.loginCase=true;

        // Navigate based on role or just go to home
        if (response.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Login failed:Invalid email or password.', error);
        this.loginError = 'Invalid email or password.';
      }
    });

    // ✅ Save email to localStorage
    // localStorage.setItem('email', email);

    // console.log('Login Successful:', email);
    // alert('Login Successful!');

    // Redirect to admin dashboard or home
    // if (email === 'sciAdmin123@example.com') {
    //   this.router.navigate(['/admin/dashboard']);
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }
}
