import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service'
import { Router } from '@angular/router';
import {User} from '../user.model'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  login!:string;
  password!:string;
  email!:string;
  date!:Date;

  constructor(private reg:UserService,private router:Router) { }

  signup(form:NgForm) : void{
      
      this.reg.registration(new User(0,form.value.username,form.value.password,
        form.value.email,new Date())).subscribe((data:any)=>alert(data[0]['message']))
        this.router.navigate(['/login']);
      
  }
  ngOnInit(): void {
  }

}