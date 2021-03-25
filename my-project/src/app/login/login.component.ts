import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service'
import { Router } from '@angular/router';
import {User} from '../user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authorization: UserService,private router:Router) { }
  email!:string;
  password!:string;
  ngOnInit(): void {
  }
 
  isEnteredAccount!:boolean;
  
  login(form:NgForm){
    this.authorization.authorization(new User(1,"assdfda", form.value.password,form.value.username,new Date())).subscribe(
      (data:any)=>{alert(data[0]['message']); if(data[0]['code']==2){ this.parsing(data[0]['data']);} })
      
  }
  parsing(data:any){
      this.authorization.User=new User(data['pk'],data['login'],data['Password'],data['Email'],
      data['date'])
      sessionStorage.setItem('user',JSON.stringify(this.authorization.User))
      this.authorization.isLogged=true;
      this.router.navigate(['/']);
    
  }

}