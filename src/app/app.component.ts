import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizBank';
  isAdmin=JSON.parse(localStorage.getItem('user') || '{}').role==='admin';//   isUser=JSON.parse(localStorage.getItem('user') || '{}').role==='user';
}
