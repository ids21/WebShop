import { Component,Input, Output ,EventEmitter,OnInit} from '@angular/core';
import {CartService} from '../cart.service'
import { ActivatedRoute } from '@angular/router';
import {Product} from '../products'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {

  constructor(
    private cartService: CartService){}
    
  @Input()item;
  @Output() delete = new EventEmitter();

  ngOnInit() {
    
  }
  
  increase(item_tovar:any): void{
    this.cartService.increaseAmmountInCart(item_tovar).subscribe((data:any)=>{this.item=data[0]['data'];});
    
};

  onDelete(){
    this.delete.emit(this.item.pk);}

}
