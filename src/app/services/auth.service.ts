import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mockUsers:User[]=[
    { id: '1', email: 'admin@quizbank.com', password: 'admin123', role: 'admin' },
    { id: '2', email: 'student@quizbank.com', password: 'student123', role: 'student' }
  ];

  login(email:string,password:string):Observable<User | null>{
    const user=this.mockUsers.find(u=>u.email===email&&u.password===password);
    if(user){
      localStorage.setItem('user',JSON.stringify(user)); //save user in local storage
      return of(user);
    }
    return of(null);
  }

  logout():void{
    localStorage.removeItem('user'); //remove user from local storage
  }

  getCurrentUser():User | null{
    const user=localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }
    return null;
  }

  constructor() { }
  
}
