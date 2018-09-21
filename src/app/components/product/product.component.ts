import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


	product = {
		fields: [],
		quantity: 1
	};

	placeSpecifications = {

		places: [
			{name: 'Description',
			class: 'active', 
			trigger: 'active'},
			{name: 'Company',
			class: '',
			trigger: ''},
			{name: 'Specifications',
			class: '',
			trigger: ''},

		],
		oldPlace: 'Description',
		descriptionTriiger: 'active',
		companyTrigger: '',
		specificationsTrigger: ''

	};
	quantityArray = [1,2,3,4,5,6,7,8,9,10];
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private appComponent: AppComponent) { }

  ngOnInit() {
  	this.getCurrentProduct();
  };


  // Function for Get Current Product
  getCurrentProduct() {

  	this.route.params.subscribe(params => {
  		
  		let database = {
  			name: params.database,
  			collection: params.collection,
  			title: params.title
  		}  		

  		this.productService.getUniversalProductByTitle(database).subscribe((data) => {
  			console.log(data);
  			for(let dataKey in data) {
  				this.product[dataKey] = data[dataKey];
  			};
  			
			let k = 0;
			this.product.fields = [];
            for(let key in data){
                		
	            if(key !== 'company' && key !== 'description' && key !== 'shortDescription' && key !== '_id' && key !== 'image' && key !== 'cost' && key !== 'fields'
	            	&& key !== 'title') {
	            	console.log(key);

	            	this.product.fields[k] = key;
	           		k++;
	            	
	            } else {
	            		
	            };                            	
            };           

  		});  		
  	});

  	console.log(this.product);

  };

  //Function For Change Text and Button of Descritions and Specifications
  changePlaceSpecifications(place) {
	
	var oldPlace = '';

	for(let i=0; i<this.placeSpecifications.places.length;i++ ) {
		
		if(this.placeSpecifications.oldPlace === this.placeSpecifications.places[i].name)	{

			this.placeSpecifications.places[i].class = '';
			this.placeSpecifications.places[i].trigger = '';
		};		

		if(place.name === this.placeSpecifications.places[i].name) {

			this.placeSpecifications.places[i].class = 'active';
			this.placeSpecifications.places[i].trigger = 'active';
			oldPlace = this.placeSpecifications.places[i].name;
		};
	};

	this.placeSpecifications.oldPlace = oldPlace;
  };

  //Function for adding Product to Client Cart
  addProductToCart(product) {

  	var returnObj = JSON.parse(localStorage.getItem(product.title))

    if(returnObj) {

      if(returnObj.quantity) {
        returnObj.quantity += product.quantity;
      };
    } else {
      
      returnObj = product;

    };

    var serialObj = JSON.stringify(returnObj); 

    localStorage.setItem(product.title, serialObj); 


    this.appComponent.getItems();
  };


// End Of Class Product.Component
};
