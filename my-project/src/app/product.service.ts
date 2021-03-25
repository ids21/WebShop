import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class productService{
    constructor(private http:HttpClient){};
    getProduct(){
        return this.http.get("http://127.0.0.1:8000/products");
    };
    getProductDetail(Id:any){
        return this.http.get("http://127.0.0.1:8000/productDetail?productId="+Id);
    }
} 