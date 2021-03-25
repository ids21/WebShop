import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Product} from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken':'sometokenhihihi'});

  constructor(
    private http: HttpClient
  ) {}

  addToCart(product:any) {
    return this.http.post('http://127.0.0.1:8000/addtocart',{ProductID:product,UserID:JSON.parse(sessionStorage.user)['ID']},{headers:this.header})

  }
  deleteFormCart(product:any){
    return this.http.get('http://127.0.0.1:8000/deletefromcart?productid='+product+'&userid='+JSON.parse(sessionStorage.user)['ID'])
  }
  
  getItems() {
    return this.http.get('http://127.0.0.1:8000/cartProducts?'+'userID='+JSON.parse(sessionStorage.user)['ID'])
  }

  increaseAmmountInCart(product:any) {
    return this.http.post('http://127.0.0.1:8000/IncreaseAmountInCart',{productid:product,userid:JSON.parse(sessionStorage.user)['ID']},{headers:this.header})

  }
}
