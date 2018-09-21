import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Product } from '../../../product.model';
import { ProductService } from '../../../product.service';

import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

	//product: Product[];

	  getedProduction;	  
	  products = [];
	  recivedItems = [];
	  subTotall = 0;

	  categories = [];
	  selectedCategory = '';
	  subCategoriesTrigger = false;
	  selectedSubCategoryTrigger = false;
	  subCategories = [];
	  selectedSubCategory = '';
	  technicalNameSelectedCategory;
	  technicalNameSelectedSubCategory;
	  searchInput;
	  newFieldTrigger = false;
	  newFieldName = '';
	  newFieldValue = '';
	  nameAddButton = 'Add Field';
	  password: string;
	  deleteDatabaseTrigger = false;
	  deleteCollectionTrigger = false;
	  adminPasswordForDatabase: string;
	  adminPasswordForCollection: string;
	  nameNewCategory: string;
	  createDatabaseTrigger = false;
	  namefirstCollection: string;
	  createCollectionTrigger = false;
	  nameNewCollection: string;
	  newProductTrigger = false;
	  createdProduct = {
	  	rating: Number,
	  	cost: Number,
	  	description: '',
	  	shortDescription: '',
	  	image: './assets/images/'
	  	
	  };
	  disabledOptions = {
	  	_id: false,
	  	fields: false

	  };
	  deleteFieldForCollactionTrigger = {};
	  adminPasswordForDeleteField = '';
	

  constructor(private productService: ProductService, private router: Router) {


  }

  ngOnInit() {
  	
  	this.getDatabases();

  	

  }

  	disableSystemOptions() {

  		for(let i=0;i<this.getedProduction.length;i++) {

  			for(let key in this.getedProduction[i]) {

  				let trigger = true;
  				for(let keydisabledOptions in this.disabledOptions) {

  					if(keydisabledOptions === key) {
  						trigger = false;
  						break;
  					}; 
  				};

  				if(trigger === true ) {
  					this.disabledOptions[key] = true;
  				};
  			};
  		};
  	};

  	onChangeUpdateInput(value, option) {
  		if(option === 'description') {
  			if(value.length>400) {
  				
  				alert('Sorry. But you can`t add to description more than 400 characters!');
  				
  				
  			};
  		}else {
  			if(option === 'shortDescription') {

	  			if(value.length>100) {
	  				
	  				alert('Sorry. But you can`t add to short description more than 100 characters!');
	  				
  					
	  			};
	  		};	
  		};
  	};

  	onChangeShortDescription(shortDescription) {
  		if(shortDescription.length>100) {
  			shortDescription.slice(0,101);
  			this.createdProduct.shortDescription = shortDescription;
  			alert('Sorry. But you can`t add to short description more than 100 characters!');
  			
  		};
  	};

  	onChangeDescription(description) {
  		let newValue = description;
  		if(description.length>400) {
  			newValue.slice(0,401);
  			this.createdProduct.description = newValue;
  			

  			alert('Sorry. But you can`t add to description more than 400 characters!');
  			
  		};
  		return newValue;
  	};

  	addNewProduct(createdProduct) {
  		var database = {
  			name: this.technicalNameSelectedCategory, 
  			collection: this.technicalNameSelectedSubCategory
  		};


  		this.productService.addUniversalProduct(database, createdProduct).subscribe((data) => {

	  		this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
	  		this.createdProduct = {
			  	rating: Number,
			  	cost: Number,
			  	description: '',
			  	shortDescription: '',
			  	image: './assets/images/'
			  	
			 };
	  		this.newProductTrigger = false;	
	  	});
	  	//location.reload();
  		 
  	};

  	createProduct() {
  		if(this.newProductTrigger === false) {
  			this.newProductTrigger = true;
  		} else {
  			this.newProductTrigger = false;
  		};
  		window.scrollTo(0, 0);
  	};

  	addCollection(nameDatabase, nameCollection) {
  		
  		this.productService.createColletion(nameDatabase, nameCollection).subscribe((data) => {
	  			
	  	});
	  	location.reload();

	  	
  	};

  	createCollection() {
  		if(this.createCollectionTrigger === false) {
  			this.createCollectionTrigger = true;	
  		} else {
  			this.createCollectionTrigger = false;
  		}; 
  	};


  	addDatabase(nameDatabase, nameCollection) {
  		

  		this.productService.createDatabase(nameDatabase, nameCollection).subscribe(() => {
	  		
	  	});
	  	location.reload();	


  	};

  	createDatabase() {

  		if(this.createDatabaseTrigger === false) {
  			this.createDatabaseTrigger = true;	
  		} else {
  			this.createDatabaseTrigger = false;
  		}; 		

  	};

  	submitDeleteCollection(adminPassword, database, collection) {
  		if(adminPassword === 'admin') {

  			this.productService.deleteCollection(database, collection).subscribe(() => {
	  			
	  		});


  			this.deleteDatabaseTrigger = false;
  				
  			
  			location.reload();
  		}else{
  			
  			alert('Sorry but your password is incorrect');
  		};

  		this.adminPasswordForCollection = '';
  	};


  	deleteCollection() {
  		this.adminPasswordForCollection = '';
  		if(this.deleteCollectionTrigger === false) {
  			this.deleteCollectionTrigger = true;
  		} else {
  			this.deleteCollectionTrigger = false;
  		};

  	};

  	submitDeleteDatabase(adminPassword, database) {
  		
  		if(adminPassword === 'admin') {

  			this.productService.deleteDatabase(database).subscribe(() => {
	  			
	  		});


  			this.deleteDatabaseTrigger = false;
  				
  			
  			location.reload();
  		}else{
  			
  			alert('Sorry but your password is incorrect');
  		};
  		this.adminPasswordForDatabase = '';

  	};

  	deleteDatabase(database) {

  		this.adminPasswordForDatabase = '';
  		if(this.deleteDatabaseTrigger === true) {
  			this.deleteDatabaseTrigger = false;
  		} else {
  			this.deleteDatabaseTrigger = true;
  		};
  	}; 

  	sumbitDeleteFieldForCollection(key) {

  		if(this.adminPasswordForDeleteField === 'admin') {

  			if(key !== '_id' && key !== '__v' && key !== 'fields'){

  				let newGetedProduction = this.getedProduction;

	  		for(let p=0;p<newGetedProduction.length;p++) {

		  		let requestedDatabase = {
		  			name: this.technicalNameSelectedCategory,
		  			collection: this.technicalNameSelectedSubCategory,
		  			id: newGetedProduction[p]._id
		  		};

		  		let sendProduct = {};

		  		let product = newGetedProduction[p];
		  		

			  		for(let name in product) {
			  			if(name !== key){
			  				if(name === 'fields'){
			  					let j =0;
			  					let currentFields = [];
			  					for(let i=0;i<product[name].length;i++){
			  						
			  						if(product[name][i] === key){

			  						}else{
			  							currentFields[j] = product[name][i];
			  							j++;
			  						}
			  					};
			  					sendProduct[name] = currentFields;
			  				}else {
			  					sendProduct[name] = product[name];
			  				}

			  				
			  				
			  			};
			  		};

		  		



			  		this.productService.updateWithoutFieldUniversalProduct(requestedDatabase, sendProduct).subscribe((data) => {
			  			
			  			
			  		});
			  		
			  };

			  	//this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
			  	this.deleteFieldForCollactionTrigger[key] = false;
			  	this.adminPasswordForDeleteField = '';

			}else alert('Sorry but you can`t delete system field');
			
			location.reload();
			

  		}else alert('Sorry but your password is incorrect');;
  	};

  	deleteFieldForCollection(key) {
  		this.adminPasswordForDeleteField = '';

  		this.deleteFieldForCollactionTrigger = {};


  		if(this.deleteFieldForCollactionTrigger[key] === false || !this.deleteFieldForCollactionTrigger[key]) {
  			this.deleteFieldForCollactionTrigger[key] = true;
  		} else {
  			if(this.deleteFieldForCollactionTrigger[key] === true) {
  				this.deleteFieldForCollactionTrigger[key] = false;
  			};
  			
  		};


  		

  	};

  	deleteField(key, product){
  		
  		if(key !== '_id' && key !== '__v' && key !== 'fields'){


		  		let requestedDatabase = {
		  			name: this.technicalNameSelectedCategory,
		  			collection: this.technicalNameSelectedSubCategory,
		  			id: product._id
		  		};

		  		let sendProduct = {};

		  		
		  		

		  		for(let name in product) {
		  			if(name !== key){
		  				if(name === 'fields'){
		  					let j =0;
		  					let currentFields = [];
		  					for(let i=0;i<product[name].length;i++){
		  						
		  						if(product[name][i] === key){

		  						}else{
		  							currentFields[j] = product[name][i];
		  							j++;
		  						}
		  					};
		  					sendProduct[name] = currentFields;
		  				}else {
		  					sendProduct[name] = product[name];
		  				}

		  				
		  				
		  			};
		  		};

	  		



	  		this.productService.updateWithoutFieldUniversalProduct(requestedDatabase, sendProduct).subscribe((data) => {
	  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
	  			
	  		});
	  		location.reload();
	  	}else alert('Sorry but you can`t delete system field');		
  	};	

  	updateFromAdmin(product) {
  		let requestedDatabase = {
  			name: this.technicalNameSelectedCategory,
  			collection: this.technicalNameSelectedSubCategory,
  			id: product._id
  		};

  		this.productService.updateUniversalProduct(requestedDatabase, product).subscribe((data) => {
  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
  			
  		});
  		

  	};

  	deleteFromAdmin(product) {

  		let requestedDatabase = {
  			name: this.technicalNameSelectedCategory,
  			collection: this.technicalNameSelectedSubCategory,
  			id: product._id
  		};

  		this.productService.deleteUniversalProduct(requestedDatabase).subscribe((data) => {
  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
  		});
  		
  	};


  	createFildForSubCategorySameValue() {
  		
  		

  		for(let i=0;i<this.getedProduction.length;i++) {
  			
  			let sendProduct = this.getedProduction[i];
  			let requestedDatabase = {
	  			name: this.technicalNameSelectedCategory,
	  			collection: this.technicalNameSelectedSubCategory,
	  			id: this.getedProduction[i]._id
	  		};  		


	  			sendProduct[this.newFieldName] = this.newFieldValue;
	  		

	  		this.productService.updateUniversalProduct(requestedDatabase, sendProduct).subscribe((data) => {
	  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
	  			
	  		});
	  		

	  		 		  	
  			
  		};



  		this.newFieldTrigger = false;
  		this.nameAddButton = 'Add Fields';
	  	this.newFieldName = '';
	  	this.newFieldValue = ''; 
  	}

  	createFildForSubCategory(product) {
  		
  		

  		for(let i=0;i<this.getedProduction.length;i++) {
  			
  			let sendProduct = this.getedProduction[i];
  			let requestedDatabase = {
	  			name: this.technicalNameSelectedCategory,
	  			collection: this.technicalNameSelectedSubCategory,
	  			id: this.getedProduction[i]._id
	  		};  		


  			if(product === this.getedProduction[i]){
	  			sendProduct[this.newFieldName] = this.newFieldValue;
	  		} else {
	  			sendProduct[this.newFieldName] = '';
	  		};

	  		this.productService.updateUniversalProduct(requestedDatabase, sendProduct).subscribe((data) => {
	  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
	  			
	  		});
	  		
	  		 		  	
  			
  		};



  		this.newFieldTrigger = false;
  		this.nameAddButton = 'Add Fields';
	  	this.newFieldName = '';
	  	this.newFieldValue = ''; 


  		
  		

  	}

  	createFieldFromAdmin(product) {
  		
  		let sendProduct = product;

  			
  		let requestedDatabase = {
  			name: this.technicalNameSelectedCategory,
  			collection: this.technicalNameSelectedSubCategory,
  			id: product._id
  		};

  		sendProduct[this.newFieldName] = this.newFieldValue;

  		this.productService.updateUniversalProduct(requestedDatabase, sendProduct).subscribe((data) => {
  			this.newFieldTrigger = false;
  			this.nameAddButton = 'Add Fields';
  			this.newFieldName = '';
  			this.newFieldValue = '';


  			this.onChangeSubCategory(this.technicalNameSelectedSubCategory);
  			
  		});
  		

  		
  		
  	};

  	addFieldFromAdmin(product) {
  		if(this.newFieldTrigger === false) {
  			this.newFieldTrigger = true;
  			this.nameAddButton = 'Hide new Fields';
  		} else {
  			this.newFieldTrigger = false;
  			this.nameAddButton = 'Add Fields';
  		};
  		
  	};

  

  	deleteProduct(id) {
  				let requestedDatabase1 = {
		  		name : this.technicalNameSelectedCategory,
		  		collection: this.technicalNameSelectedSubCategory,		
		  		id: id
		  		};		  		

			  	this.productService.deleteUniversalProduct(requestedDatabase1).subscribe(() => {		                
			                
			        this.router.navigate(['shop']);  

			    });  
  };

  
  	getDatabases() {
	  		this.productService.getDatabases().subscribe((data) => {
	      	
	      var i = 0;
	      for(var name in data ) {
	        
	        let arrayObject = {};
	        this.categories[i] = arrayObject;
	        this.categories[i].value = data[name]; 
	        var capitalizeChar = data[name];
	        var singleChar = capitalizeChar[0].toUpperCase();
	        var resultString = '';        
	        
	        for(var j=0;j<capitalizeChar.length;j++) {
	          if(j === 0){
	           resultString = resultString + singleChar;
	          } else {
	            resultString = resultString + capitalizeChar[j];
	          };
	        };        
	        this.categories[i].value = resultString;   
	        
	        i += 1;
	        
	      };
	       
    	});
  	};

    onChangeSubCategory(selectedSubCategory) {
    	this.searchInput = ' ';
        this.selectedSubCategoryTrigger = true;
        this.getedProduction = [];
        var requestedDatabase = {name: '', collection: ''};

        var capitalizeChar = selectedSubCategory;
        var singleChar = capitalizeChar[0].toLowerCase();
        var resultString = '';        
        
        for(var j=0;j<capitalizeChar.length;j++) {
          if(j === 0){
           resultString = resultString + singleChar;
          } else {
            resultString = resultString + capitalizeChar[j];
          };
        };

        this.technicalNameSelectedSubCategory = requestedDatabase.collection = resultString;
        requestedDatabase.name = this.technicalNameSelectedCategory;


            this.productService.getUniversalProducts(requestedDatabase).subscribe((data) => {
                
                var i = 0;
                for(var name in data) {
                   this.getedProduction[i] = data[name];
                   i++;


                   
                };  
                

                for(let j=0;j<this.getedProduction.length;j++) {
                	this.getedProduction[j].fields = [];
                	let k = 0;
                	for(let key in this.getedProduction[j]){
                		//console.log(this.getedProduction[j]);
                		let middleVar = this.getedProduction[j];
                		this.getedProduction[j].fields[k] = key;
                		k++;
                		//console.log(key);
                		//console.log(this.getedProduction.fields[j]);
                	};
                };     


                this.getedProduction.sort(function(a, b){
                	if(a.title < b.title) return -1;
    				if(a.title > b.title) return 1;
    				return 0;
                });
                
                this.selectedSubCategoryTrigger = true;
                this.searchInput = ' ';
            	this.searchInput = '';
                this.disableSystemOptions();
                window.scrollTo(0, 0);
            }); 


            
  };


 


  onChangeCategory(database){
        this.selectedSubCategory = '';
        if(this.selectedSubCategory === ''){
          this.selectedSubCategoryTrigger = false;
        };

        this.subCategories = [];
        var capitalizeChar = database;
        var singleChar = capitalizeChar[0].toLowerCase();
        var resultString = '';        
        
        for(var j=0;j<capitalizeChar.length;j++) {
          if(j === 0){
           resultString = resultString + singleChar;
          } else {
            resultString = resultString + capitalizeChar[j];
          };
        };

        this.technicalNameSelectedCategory = resultString;

    this.productService.getCollections(resultString).subscribe((data) => {
      if(data){
        this.subCategoriesTrigger = true;
      };
      
      var i = 0;
      for(var name in data) {
        let arrayObject = {};
        this.subCategories[i] = arrayObject;

        var capitalizeChar = data[name];
        var singleChar = capitalizeChar[0].toUpperCase();
        var resultString = '';        
        
        for(var j=0;j<capitalizeChar.length;j++) {
          if(j === 0){
           resultString = resultString + singleChar;
          } else {
            resultString = resultString + capitalizeChar[j];
          };
        };        
        this.subCategories[i].value = resultString;

        i++;
      };      
        
    });

    
    
  };



}



