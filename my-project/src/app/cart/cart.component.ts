import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product} from '../products';
import { FormsModule }   from '@angular/forms';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  items;
  checkoutForm;

  constructor(private cartService: CartService, private UserService:UserService) { }


  ngOnInit() {
    this.cartService.getItems().subscribe((data:any)=>{this.items=data[0]['data'];});
  }


  delete(id): void {
     
    this.cartService.deleteFormCart(id).subscribe((data:any)=>{alert(data[0]['message']); if(data[0]['code']==1){}})
  }  


}
