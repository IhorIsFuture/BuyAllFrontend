import { Component, OnInit } from '@angular/core';
import { ShopComponent } from './../shop.component'

@Component({
  selector: 'app-getproducts',
  templateUrl: './getproducts.component.html',
  styleUrls: ['./getproducts.component.css']
})
export class GetproductsComponent implements OnInit {

  constructor(private shopComponent: ShopComponent ) {}

  ngOnInit() {
  	console.log('before');
  	this.shopComponent.getProducts();
  	console.log('after');

  }

}
