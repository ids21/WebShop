import { Component, Input} from '@angular/core';

import { Product} from '../products';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { productService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[productService]
})

export class ProductListComponent {
  //products : Product[] = products;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService:productService,
    private UserService:UserService
  ) { }

  product:any;
  dataReceived:boolean=false;

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data:any)=>{this.product=data[0]['data'];});
    
  }
  addToCart(product) {
    if(!this.UserService.isLogged){
      alert('Авторизуйтесь!')
  }
  else{
    this.cartService.addToCart(product+1).subscribe((data:any)=>alert(data[0]['message']));
    window.alert('Your product has been added to the cart!'); 
  }
  }


}