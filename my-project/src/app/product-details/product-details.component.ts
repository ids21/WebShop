import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../products';
import { CartService } from '../cart.service';
import { productService } from '../product.service';
import { UserService } from '../user.service';
import {ProductListComponent} from '../product-list/product-list.component'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers:[productService]
})
export class ProductDetailsComponent implements OnInit {
  product;
  Id;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService:productService,
    private UserService:UserService,
  ) { }

  ngOnInit(): void {
    this.Id =this.route.snapshot.paramMap.get('productId');
    this.productService.getProductDetail(Number.parseInt(this.Id)+1).subscribe((data:any)=>{this.product=data[0]['data'][0];});
  }
  addToCart(product_) {
    if(!this.UserService.isLogged){
      alert('Авторизуйтесь!')
  }
  else{
    this.cartService.addToCart(product_).subscribe((data:any)=>alert(data[0]['message']));
    window.alert('Your product has been added to the cart!'); 
}
  }


}
