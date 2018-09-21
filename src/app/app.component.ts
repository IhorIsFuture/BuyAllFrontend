import { ProductService } from './product.service';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';




import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	products = [];
	recivedItems = [];
	subTotall = 0;
	numberProducts = 0;
  totallCart = {
    totallProducts: 0,
    totallCost: 0,
    result: ''
  };


  signInObject = {
    trigger: false,
    userObj: {
      email: '',
      password: ''
    }
  };

  signUpObject = {

    trigger: false,
    userObj: {
      nick: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
      phone: '',



    }
  };

  uniqueNicks = [];
  uniqueEmails = [];
  uniquePhones = [];
  nickWarningTrigger = false;
  emailWarningTrigger = false;
  phoneWarningTrigger = false;
  passwordWarningTrigger = false;
  signInTrigger = false;
  user = {};
  signOutTrigger = false;


constructor(private productService: ProductService, private location: Location, private http: HttpClient) {
	
	
};

ngOnInit() {
  this.getItems();
  this.initSignIn();
  	
  };

  

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
  			
        
  			recivedArray[i] = receivedItem; 	i++;
  		};
  		 			 		
  	};    
    
    i=0;
    let totalCostWithCloneProducts = 0;
    for(i;i<recivedArray.length;i++) {
      if( recivedArray[i].quantity >0) {
        this.totallCart.totallCost += recivedArray[i].cost * recivedArray[i].quantity;
        totalCostWithCloneProducts += recivedArray[i].quantity;
      } else {
        this.totallCart.totallCost += recivedArray[i].cost;
        totalCostWithCloneProducts += 1;
      }
      
    };
    this.totallCart.totallProducts = totalCostWithCloneProducts;

    if(this.totallCart.totallProducts === 0) {
      this.totallCart.result = '';
    };
    this.totallCart.result = '' + this.totallCart.totallProducts + ' Products cost $' + this.totallCart.totallCost;

   
  	
  	
  };

  showHiddenSignIn() {

    if(this.signInObject.trigger === false) {
        this.signInObject.trigger = true;
    } else {
      this.signInObject.trigger = false;
    };

  };

  signIn(signInObj) {

    if(signInObj !== 'facebook' && signInObj !== 'google') {

      if(signInObj.userObj.email !== '' && signInObj.userObj.password !== '') {

        this.productService.signIn(signInObj).subscribe((data) => {

          var serialObj = JSON.stringify(data); 

          localStorage.setItem('user', serialObj);
           console.log(data);
           this.user = data;
           this.initSignIn();
           this.signInObject.trigger = false;
        });

        
      };
    };

    if(signInObj === 'facebook') {

      alert('Sorry but now this function is not available');
    };
    
    if(signInObj === 'google') {

      alert('Sorry but now this function is not available');
    };
  };

  //Function For Check unique User Nickname
  onChangeNickname(nick) {

    let uniqueTrigger = true;
    for(let i=0;i<this.uniqueNicks.length;i++) {
      if(nick === this.uniqueNicks[i]) {
        uniqueTrigger = false;
      };

    };

    if(uniqueTrigger === false) {

      this.nickWarningTrigger = true;
    } else {

        this.nickWarningTrigger = false;
      };

    
  };

  //Function For Check unique User Email
  onChangeEmail(email) {

    let uniqueTrigger = true;
    for(let i=0;i<this.uniqueEmails.length;i++) {
      if(email === this.uniqueEmails[i]) {
        uniqueTrigger = false;
      };

    };

    if(uniqueTrigger === false) {

      this.emailWarningTrigger = true;
    } else {

        this.emailWarningTrigger = false;
      };

    
  };


  //Function For Check unique User Phone
  onChangePhone(phone) {

    let uniqueTrigger = true;
    for(let i=0;i<this.uniquePhones.length;i++) {
      if(phone === this.uniquePhones[i]) {
        uniqueTrigger = false;
      };

    };

    if(uniqueTrigger === false) {

      this.phoneWarningTrigger = true;
    } else {

        this.phoneWarningTrigger = false;
      };

    
  };

  //Function For Check unique User Phone
  onChangePassword(password) {

    let uniqueTrigger = true;
    
      if(password !== this.signUpObject.userObj.password) {
        uniqueTrigger = false;
      };

    

    if(uniqueTrigger === false) {

      this.passwordWarningTrigger = true;
    } else {

        this.passwordWarningTrigger = false;
      };

    
  };

 
  //Function For Registration New User
  signUp(user) {
   
   if(this.nickWarningTrigger === false && this.emailWarningTrigger === false && this.passwordWarningTrigger === false 
     && this.phoneWarningTrigger === false ) {
      if(this.signUpObject.userObj.nick !== '' && this.signUpObject.userObj.email !== '' && this.signUpObject.userObj.password !== '' 
        && this.signUpObject.userObj.phone !== '' ) { 

        this.productService.addUser(user).subscribe((data) => {
          this.showHiddenSignUp();  
          this.signUpObject = {
            trigger: false,
            userObj: {
              nick: '',
              email: '',
              password: '',
              confirmPassword: '',
              avatar: '',
              phone: '',
            }
          };

          this.signInObject.trigger = true;
        }); 
      };
    };  
  };

  //Function For Open and Hidden Sign Up PopUp
	showHiddenSignUp() {

    if(this.signUpObject.trigger === false) {
        this.getAllUniqueNicksEmails();
        this.signUpObject.trigger = true;
    } else {
      this.signUpObject.trigger = false;
    };
  };

  //Function For geting all Unique Emails and Nick   
  getAllUniqueNicksEmails() {

    this.productService.findUniqueNick().subscribe((data) => {
     
       let jN = 0;
       let jE = 0;
       let jP = 0;
      for(let i in data) {        
         
         for(let key in data[i]) {          
               
              if(key === 'nick'){

                 this.uniqueNicks[jN] = data[i][key];                 
                 jN++;

              };

              if(key === 'email') {

                 this.uniqueEmails[jE] = data[i][key];                 
                 jE++;

                 
              };

              if(key === 'phone') {

                 this.uniquePhones[jP] = data[i][key];                 
                 jP++;

                 
              };
             
         };
      };

          

    });
  };

  // Function for initialization of User Sign In 
  initSignIn() {

    let receivedItem = JSON.parse(localStorage.getItem('user'));

    if(receivedItem) {
      this.user = receivedItem;
      this.signInTrigger = true;
    } else {
      this.signInTrigger = false;
    };
   

  };

  //Function For User Sign Out
  signOut() {

    localStorage.removeItem('user');
    this.initSignIn();
    this.showHiddenSignOut();
  };

  //Function For Showing And Hiding of Popup Confirm 'Sign Out '
  showHiddenSignOut() {

    if(this.signOutTrigger === false) {
        this.signOutTrigger = true;
    } else {
      this.signOutTrigger = false;
    };
  };

  title = 'app';


// End of Class  
}
