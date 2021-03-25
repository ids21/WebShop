export class Product{    
  id:number;
  name:string;
  price:number;
  description: string;
  amount:number;
  sum:number;
  img:string;
  constructor(id:number,name: string, price:number=1, amount:number=0,description: string, img:string=''){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.amount = amount;
    this.sum = amount  * price;
  }
}

