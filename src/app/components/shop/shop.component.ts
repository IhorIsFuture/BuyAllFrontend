import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { AppComponent } from '../../app.component';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';






@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  

	product: Product[];
  getedProduction = [];
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
  buttonFilterTrigger = false;
  pageSize = "20";
  pageSizeOptions = [20, 50, 100];
  currentPage;
  minRangeCostValue = Number;
  maxRangeCostValue = Number;
  minRangeCost = 0.1;
  maxRangeCost = Number;
  filterOptions = {
    fields: [],
    objects: []
  };

  choosedCompanys = [];
  welcomeInShop = true;
  getedProductsInPages = {
   examplesNumbersOfProducts: [10, 20, 30, 50, 100],
   numberOfProductsOnPage: 20,
   numberOfPages: Number,
   arrays: {},
   currentPage: 1,
   minNumber0fPages: 1,
   maxNumberOfPages: 1,
   sortingCurrent: 'From Expensive to Cheap',
   sortingArray: ['From Expensive to Cheap', 'From Cheap to Expensive']   

   };


  
      



  constructor( private productService: ProductService, private router: Router, private route: ActivatedRoute, private appComponent: AppComponent, private cookieService: CookieService) { }


   


  ngOnInit() {  
 	  
    this.getProducts();
    this.getDatabases();
    this.searchInput =' ';
     this.searchInput ='';
     
  };

  

  getDatabases() {
    this.productService.getDatabases().subscribe((data) => {
      
      var i = 0;
      for(var name in data ) {
        
        if(data[name] !== 'users') {
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
      };
       
    });
  };

  // Function for Check of Routing
  getProducts() {
     
    this.route.params.subscribe(param => {

      
      if(param.database) {
        this.getDatabases();
        this.selectedCategory = this.toUpperChar(param.database);
        this.technicalNameSelectedCategory = param.database;
        this.onChangeCategory(this.toUpperChar(param.database));       
        

        this.selectedSubCategory = this.toUpperChar(param.collection);
        this.onChangeSubCategory(param.collection);
      }else {
         this.getDatabases();
       };
    });

    
  };

  //Funtion for changing first char in String;
  toUpperChar(string) {

        var capitalizeChar = string;
        var singleChar = capitalizeChar[0].toUpperCase();
        var resultString = '';        
        
        for(var j=0;j<capitalizeChar.length;j++) {
          if(j === 0){
           resultString = resultString + singleChar;
          } else {
            resultString = resultString + capitalizeChar[j];
          };
        }; 

        return resultString;    
  };

  onChangeSubCategory(selectedSubCategory) {

        this.searchInput = '  ';

        
        
        this.selectedSubCategoryTrigger = true;
        this.getedProduction = [];
        var reqestedDatabase = {name: '', collection: ''};

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

        this.technicalNameSelectedSubCategory = reqestedDatabase.collection = resultString;
        reqestedDatabase.name = this.technicalNameSelectedCategory;
         
         

          let url1 = '/shop/'+ this.technicalNameSelectedCategory + '/' + this.technicalNameSelectedSubCategory ; 
          this.router.navigate([`${url1}`]);

            this.productService.getUniversalProducts(reqestedDatabase).subscribe((data) => {
                
                var i = 0;
                for(var name in data) {
                   this.getedProduction[i] = data[name];
                   
                   for(let nameOption in data[name]) {
                     let variable = data[name][nameOption];
                     
                     if(+variable > 0 ) {
                       this.getedProduction[i][nameOption] = +variable;
                     };

                   };
                   
                   i++;
                }; 
                
                    

                this.selectedSubCategoryTrigger = true;              
                this.searchInput = '';
                this.filterOptions = {
                  fields: [],
                  objects: []
                };       
                this.createFilter();
                this.changePage();
                this.sortingProducts();
                

                this.buttonFilterTrigger = true;
                this.welcomeInShop = false;
                
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

  useFilter() {

    
    var reqestedDatabase = {name: this.technicalNameSelectedCategory, collection: this.technicalNameSelectedSubCategory};  


    
            this.getedProduction = [];

            this.productService.getUniversalProducts(reqestedDatabase).subscribe((data) => {
                
                              var i = 0;
                              for(var name in data) {
                                 this.getedProduction[i] = data[name];
                                 
                                 for(let nameOption in data[name]) {
                                   let variable = data[name][nameOption];
                                   
                                   if(+variable > 0 ) {
                                     this.getedProduction[i][nameOption] = +variable;
                                   };

                                 };
                                 
                                 i++;
                              };                    

                            

                  let selectedCompanys = [];

                  let newGetedProduction = [];

                  let k = 0;
                  let inactiveChoose = true;
                  
                 

                  for(let i=0;i<this.getedProduction.length;i++) {

                    let productTrigger = true;
                    for(let key in this.filterOptions.objects) {

                     
                      if(this.filterOptions.objects[key].type === true) {

                        if(this.getedProduction[i][key]){

                          if(this.getedProduction[i][key]<= this.filterOptions.objects[key].currentMax && this.getedProduction[i][key] >= this.filterOptions.objects[key].currentMin ) {

                          } else {
                              productTrigger = false;
                              break;
                            };
                        };    
                      };

                      if(this.filterOptions.objects[key].type === false) {

                        let triggerAllObjects = false;
                        let triggerForOption = false;
                        for(let j=0;j<this.filterOptions.objects[key].names.length;j++) {

                          if(this.filterOptions.objects[key].names[j].trigger === true) {
                            triggerAllObjects = true;
                            if(this.getedProduction[i][key] === this.filterOptions.objects[key].names[j].name) {
                              triggerForOption = true;
                            };

                          };

                          
                        };

                        if(triggerAllObjects === false) {
                          triggerForOption = true;
                        }else {
                          if(triggerForOption === false) {
                            productTrigger = false;
                            break;
                          };
                          
                         };          
                      };



                    };

                    if(productTrigger === true) {
                      newGetedProduction[k] = this.getedProduction[i];
                      k++;
                    };

                  };

                  this.getedProduction = [];    
                  this.getedProduction = newGetedProduction;

                  this.changePage();

                  
                  window.scrollTo(0, 0);
  
                
    });
  };

  
  createFilter() {
    
    
    for(let i=0; i<this.getedProduction.length; i++) {

      let j = 0
      
      for(let key in this.getedProduction[i]) {
        let exampleForObject = {
              type: true,
              names: []
        };

        
        if(j === 0 && i === 0 && key !== 'fields' && key !== '_id' && key !== 'image' && key !== 'description' && key !== 'shortDescription' && key !== 'title'){
          
          this.filterOptions.fields[j] = key;

          if(typeof(this.getedProduction[i][key]) === 'number'){
            
            exampleForObject.type = true;
            this.filterOptions.objects[key] = exampleForObject;
                        
          }else{
            
            exampleForObject.type = false;
            this.filterOptions.objects[key] = exampleForObject;
           
            };
          
          j++;
        };

        let triggerOfEqualityKeys = true;
        let triggerOfEqualityValues = true;

        for(let k=0;k<this.filterOptions.fields.length;k++) {

          if(this.filterOptions.fields[k] === key){
            triggerOfEqualityKeys = false;
            break;
          };          
          
        };

        if(triggerOfEqualityKeys === true && key !== 'fields' && key !== 'image' && key !== '_id' && key !== 'description' && key !== 'shortDescription' && key !== 'title') {
          this.filterOptions.fields[j] = key;
          if(typeof(this.getedProduction[i][key]) === 'number'){
            
            exampleForObject.type = true;
            this.filterOptions.objects[key] = exampleForObject;
                         
          }else{
            
            exampleForObject.type = false;
            this.filterOptions.objects[key] = exampleForObject;
            
            };
          j++;
        };

        
      };
      
    };    


     for(let key in this.filterOptions.objects) {
     
        let k = 0;
        for(let i=0; i<this.getedProduction.length; i++) {


          let nameObject = {
             name: '',
             trigger: false
          };
         
          let triggerForValue = true;
          if(k === 0) {
              

              if(this.getedProduction[i][key]){
                nameObject.name = this.getedProduction[i][key]; 
                this.filterOptions.objects[key].names[k] = nameObject;
                k++;
                triggerForValue = false;
              }else{triggerForValue = false;};  
              
           } else {

              for(let j = 0;j<this.filterOptions.objects[key].names.length;j++) {             
                
                  if(this.getedProduction[i][key]){

                    if(this.filterOptions.objects[key].names[j].name === this.getedProduction[i][key]) {

                      triggerForValue = false;
                      break;
                    };
                  }else{
                    triggerForValue = false;
                    break;
                  };                             
              };
            };

          if(triggerForValue === true){
            
            nameObject.name = this.getedProduction[i][key]; 
            this.filterOptions.objects[key].names[k] = nameObject;
            k++;
            
          };
        };
     }; 

     for(let key in this.filterOptions.objects) {

       if(this.filterOptions.objects[key].type === true){

         let minValue = 0;
         let maxValue = Number;

         for(let i=0;i<this.filterOptions.objects[key].names.length;i++) {
           if(i === 0) {
             minValue = this.filterOptions.objects[key].names[i].name;
             maxValue = this.filterOptions.objects[key].names[i].name;
           } else {

             if(minValue > this.filterOptions.objects[key].names[i].name){

               minValue = this.filterOptions.objects[key].names[i].name;
             };

             if(maxValue < this.filterOptions.objects[key].names[i].name) {

               maxValue = this.filterOptions.objects[key].names[i].name;
             };
           };
         };

           this.filterOptions.objects[key].min = minValue;
           this.filterOptions.objects[key].max = maxValue;
           this.filterOptions.objects[key].currentMin = minValue;
           this.filterOptions.objects[key].currentMax = maxValue;
        };

     };

     

  };

  // Function for Change Quantity of Products per Page
  selectNumberOfProductsPerPage() {    
    
    this.comeBackGetedProductsData();
    this.changePage();
    window.scrollTo(0,0);
    
  };

  // Function for change Current Page to Number of Button Page
  changePagePerNumber(numberOfPage) {
    
     this.getedProductsInPages.currentPage = numberOfPage;
     let newData = this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1)].arrays;
     this.getedProduction = newData;

     //this.getedProductsInPages.arrays[(numberOfPage-1)].class = 'active';
     for(let i in this.getedProductsInPages.arrays) {

       if(this.getedProductsInPages.arrays[i].class === 'active') {
         this.getedProductsInPages.arrays[i].class = '';
         this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1)].class = 'active';
       }
     };
     

     window.scrollTo(0,0);
     
  };

  // Function for change Current Page to Next Page
  nextPage() {

    let localCurrentPage = +this.getedProductsInPages.currentPage +1;

    if( localCurrentPage <= +this.getedProductsInPages.maxNumberOfPages ) {

       this.getedProductsInPages.currentPage  = localCurrentPage;    
       let newData = this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1) ].arrays;
       this.getedProduction = newData;

       for(let i in this.getedProductsInPages.arrays) {

         if(this.getedProductsInPages.arrays[i].class === 'active') {

           this.getedProductsInPages.arrays[i].class = '';
           this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1)].class = 'active';
         };
       };       

         window.scrollTo(0,0);
      };
  };

  // Function for change Current Page to Previous Page
  previousPage() {

    if(this.getedProductsInPages.currentPage !== 1){

      this.getedProductsInPages.currentPage -=1;      
      let newData = this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1)].arrays;
      this.getedProduction = newData;
       
      for(let i in this.getedProductsInPages.arrays) {

         if(this.getedProductsInPages.arrays[i].class === 'active') {
           this.getedProductsInPages.arrays[i].class = '';
           this.getedProductsInPages.arrays[(this.getedProductsInPages.currentPage-1)].class = 'active';
         };
      };       

       window.scrollTo(0,0);
    }; 
  };

  // Function return data from Pages 'this.getedProductsInPages.arrays' in Single Array 'this.getedProduction'
  comeBackGetedProductsData() {
   
    let k=0;
    let products = [];

    for(let i in this.getedProductsInPages.arrays) {     

      for(let j in this.getedProductsInPages.arrays[i].arrays) {

        products[k] = this.getedProductsInPages.arrays[i].arrays[j];        
        k++;

      };
    };

    this.getedProduction = products;    

  };

  // Function for sorting current Products.
  sortingProducts() {    
    
    this.comeBackGetedProductsData();
    
    let midlleWareArray = this.getedProduction;
    this.getedProduction = [];    
     
    if(this.getedProductsInPages.sortingCurrent === 'From Expensive to Cheap') {

            midlleWareArray.sort(function(a, b){
                  if(a.cost < b.cost) return 1;
                  if(a.cost > b.cost) return -1;
                  return 0;
            });
    };

    if(this.getedProductsInPages.sortingCurrent === 'From Cheap to Expensive') {           

           midlleWareArray.sort(function(a, b){
                  if(a.cost < b.cost) return -1;
                  if(a.cost > b.cost) return 1;
                  return 0;
            });            
    };

    this.getedProduction = midlleWareArray;
    this.changePage();   

  };

  // Function For Divide DATA Product to Pages arrays
  changePage() { 
                  this.getedProductsInPages.arrays = {};                  
                  this.getedProductsInPages.currentPage = 1;

                  let activeTrigger = this.getedProductsInPages.currentPage;
                  let arrayOfProductsAllPages = [];                  
                  let arrayOfProductsOnePage = {
                    arrays: [],
                    class: '',
                    name: Number
                  };

                  let kAll = 0, equalsVar = 0, kOne = 0; 

                  for(let j = 0;j<this.getedProduction.length;j++){

                    arrayOfProductsOnePage.arrays[kOne] = this.getedProduction[j];                     
                    kOne++;
                    equalsVar++;

                    if (equalsVar === this.getedProductsInPages.numberOfProductsOnPage || (this.getedProduction.length-1) === j) {

                      arrayOfProductsAllPages[kAll] = {
                        arrays: arrayOfProductsOnePage.arrays,
                        class: '',
                        name: (kAll + 1) + ''
                      };

                      if((this.getedProduction.length-1) === j){

                        this.getedProductsInPages.maxNumberOfPages = +kAll + 1;
                      };
                      
                      let currentPageOfAraay =  kAll + 1;
                      
                      if(this.getedProductsInPages.currentPage === currentPageOfAraay) {

                         arrayOfProductsAllPages[kAll].class = 'active';                   
                      } else {

                        arrayOfProductsAllPages[kAll].class = '';
                      };

                      kAll++;
                      kOne = 0;
                      arrayOfProductsOnePage.arrays = [];
                      equalsVar = 0;
                    };

                  };             

                
                let currentArray = +this.getedProductsInPages.currentPage -1;
                this.getedProductsInPages.arrays = arrayOfProductsAllPages;
                
                let newData = this.getedProductsInPages.arrays[currentArray].arrays;
                this.getedProduction = newData;

  };


  // Function for Adding current product to Cart of Client
  addProductToCart(prod) {
    
    

    var returnObj = JSON.parse(localStorage.getItem(prod.title))

    if(returnObj) {

      if(returnObj.quantity) {
        returnObj.quantity +=1;
      };
    } else {
      prod.quantity = 1;
      returnObj = prod;

    };

    returnObj.database = this.technicalNameSelectedCategory;
    returnObj.collection = this.technicalNameSelectedSubCategory;

    var serialObj = JSON.stringify(returnObj); 

    localStorage.setItem(prod.title, serialObj); 


    this.appComponent.getItems();
       
  };

  // Function for Redirect to Page of Current Product
  redirectToProduct(database, collection, prod ) {
    
    let url = '/product/'+ database + '/' + collection + '/' + prod.title; 
    this.router.navigate([`${url}`]);
  };
 
//End Of Shop.Module class
}
