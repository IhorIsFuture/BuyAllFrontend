import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

import { ProductService } from '../../product.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


	products = [];
	recivedItems = [];
	subTotall = 0;
	numberProducts = 0;
  totallCart = {
    totallProducts: 0,
    totallCost: 0,
    result: ''
  };
  quantityArray = [1,2,3,4,5,6,7,8,9,10];
	
  constructor(private productService: ProductService, private router: Router, private appComponent: AppComponent) { }
  	
  ngOnInit() {
  	
  	this. getItems();

  }

 
 // Funtion for Refresh Products in Client Cart
 getItems(){
    let recivedArray = [];
    let i = 0;

    this.totallCart.totallProducts = 0;
    this.totallCart.totallCost = 0;
    this.totallCart.result = '';

    for(let key in localStorage) {
      
      if(key !== 'test' && key !== 'length' && key !== 'key' && key !== 'getItem' && key !== 'setItem' && key !== 'removeItem' && key !== 'clear' && 
        key !== 'totallCart' && key !== 'user'){
        let receivedItem = JSON.parse(localStorage.getItem(key));
        
        
        recivedArray[i] = receivedItem;

        i++;
      };
                  
    };    
    
    this.products = recivedArray;

    i=0;
    let totalCostWithCloneProducts = 0;
    for(i;i<recivedArray.length;i++) {

      if( recivedArray[i].quantity >0) {
        this.totallCart.totallCost += recivedArray[i].cost * recivedArray[i].quantity;
        totalCostWithCloneProducts += recivedArray[i].quantity;
      } else {
        this.totallCart.totallCost += recivedArray[i].cost;
        totalCostWithCloneProducts += 1;
      };  
      
    };
    this.totallCart.totallProducts = totalCostWithCloneProducts;    
    this.totallCart.result = '' + this.totallCart.totallProducts + ' Products cost $' + this.totallCart.totallCost;
    console.log(this.products);   
    
  };



  // Function for Delete Product from Client Cart
  deleteItem(key) {
   	localStorage.removeItem(key);   
    this.appComponent.getItems();
    this.getItems();
  	
  };


  // Function for Change Quantity current Product
  changeQuantityOfProduct(product) {

    var returnObj = JSON.parse(localStorage.getItem(product.title))     
    returnObj.quantity = product.quantity;    
    var serialObj = JSON.stringify(returnObj); 
    localStorage.setItem(product.title, serialObj);

    this.appComponent.getItems();
    this.getItems();

  };

 
 

}
