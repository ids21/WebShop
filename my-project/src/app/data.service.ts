import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class PDCService{
    
    constructor(private httpClient:HttpClient,private UIC:UserService){}

    header = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken':'sometokenhihihi'});
    delete(ID:number){
        
          return this.httpClient.post('http://127.0.0.1:8000/deleteProduct',{ID:ID},{headers:this.header})
    }
    inCart(pid:any){
        console.log(JSON.parse(sessionStorage.user)['ID'])
        return this.httpClient.post('http://127.0.0.1:8000/addtocart',{PhoneID:pid,UserID:JSON.parse(sessionStorage.user)['ID']},{headers:this.header})
    }
    fromcart(pid:number){
        return this.httpClient.get('http://127.0.0.1:8000/deletefromcart?productid='+pid+'&userid='+JSON.parse(sessionStorage.user)['ID'])
    }
}