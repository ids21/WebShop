import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {User} from './user.model'
import {Observable} from 'rxjs'
@Injectable({providedIn:'root'})


export class UserService implements OnInit{
    public User!:User;
    public cartList:any;
    data=sessionStorage.user ? JSON.parse(sessionStorage.user) : undefined ;
    public isLogged:boolean=sessionStorage.user;
    constructor( private HttpClient:HttpClient,private router:Router){
      
    }
    registration(User:User){
      let header = new HttpHeaders({
         'Content-Type': 'application/json',
         'X-CSRFToken':'sometokenhihihi'});
       const body={login:User.login,email:User.email,password:User.password,
                     date:User.date}
       return this.HttpClient.post('http://127.0.0.1:8000/signup',body,{headers:header})
    }

    authorization(User:User){
     
        let header = new HttpHeaders({
           'Content-Type': 'application/json',
           'X-CSRFToken':'sometokenhihihi'});
         const body={email:User.email,password:User.password}
         return this.HttpClient.post('http://127.0.0.1:8000/login',body,{headers:header})
      
    }
  
    getProductList(userID:number){
      return this.HttpClient.get('http://127.0.0.1:8000/cartProducts?userID='+userID)
    }
    toBDProduct(data:any){

      let header = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken':'sometokenhihihi'});
      return this.HttpClient.post('http://127.0.0.1:8000/addproduct',data,{headers:header})
    }
    ngOnInit(): void {
      if(sessionStorage.user)
      this.User=new User(this.data['ID'],
      this.data['login'],this.data['password'],this.data['email'],
      this.data['date'])
    }
    
}