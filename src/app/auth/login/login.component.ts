import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule , RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  errorMessage:string|null=null;
constructor(private router:Router , private fb:FormBuilder , private authService:AuthService){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
}

onSubmit(){
  if(this.loginForm.valid){
    const {email,password}=this.loginForm.value;
    this.authService.login(email,password).subscribe(user=>{
      if(user){
        if(user.role==='admin'){
          this.router.navigate(['/admin']);
        }else
        this.router.navigate(['/home']);
      }else{
        this.errorMessage='Invalid email or password'; // this.router.navigate(['/login']);
      }
    });
  }
}

}
