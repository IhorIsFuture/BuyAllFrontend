import { HttpClient } from '@angular/common/http';

import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

import * as $ from 'jquery';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	products = [];
  sliderImages = {
    current: './assets/images/dummy-2.jpg',
    array: ['./assets/images/dummy-2.jpg' ,'./assets/images/dummy-1.jpg','./assets/images/dummy-6.jpg']
  };
  

  constructor(private http: HttpClient) { }


  ngOnInit() {
  	
    //this.startTimer();

    setInterval(() => {
      this.changeSliderImage();
    }, 4000);
    
  }

  getProducts() {

  	let url =  'http://localhost:4000/universalProducts/getCach' ;    
    return this.http.get(`${url}`);
  };  

  changeSliderImage() {

    for(let i=0;i<this.sliderImages.array.length;i++ ) {
      if(this.sliderImages.current === this.sliderImages.array[i]) {
        if(i !== (this.sliderImages.array.length-1)) {
          this.sliderImages.current = this.sliderImages.array[(i+1)];
          break;
        } else {
          this.sliderImages.current = this.sliderImages.array[0];
          break;
        };
      };
    };
    

  };
  
 

}
