// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://questions-bank-sigma.vercel.app';
  constructor() {}

  loginCase:boolean=false;

  isLoggedIn(): boolean {
    // Example: check if token exists in localStorage
    // return !!localStorage.getItem('token');
    return this.loginCase;
  }
}
