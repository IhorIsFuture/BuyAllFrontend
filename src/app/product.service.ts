import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

	uri = 'http://localhost:4000';
	
	
  constructor(private http: HttpClient) {

  }

  signIn(object) {
    
    let userObj = object.userObj;
    var url = 'http://localhost:4000/users/signIn/';
     
    return this.http.post(`${url}`, userObj);
  };

  findUniqueNick() {
    
    var url = 'http://localhost:4000/users/getUniqueNicksEmails/';
     
    return this.http.get(`${url}`,);
  };

  addUser(user) {
    
    var url = 'http://localhost:4000/users/signup/';
     
    return this.http.post(`${url}`, user);
  };


  getUniversalProducts(database) {
    
    var url = this.uri + '/universalProducts/' + database.name + '/' + database.collection;    
    return this.http.get(`${url}`);
  };

  getUniversalProductById(database) {

     var url = this.uri + '/universalProducts/' + database.name + '/' + database.collection + '/' + database.id;    
    return this.http.get(`${url}`);

  };

  getUniversalProductByTitle(database) {

     var url = this.uri + '/universalProducts/byTitle/' + database.name + '/' + database.collection + '/' + database.title;    
    return this.http.get(`${url}`);

  };

  addUniversalProduct(database, product) {
    
    var url = this.uri + '/universalProducts/' + database.name + '/' + database.collection + '/add';       
    return this.http.post(`${url}`, product);
  };

  updateWithoutFieldUniversalProduct(database, product) {
    let products = product;  
     
    var url = this.uri + '/universalProducts/updateWithoutField/' + database.name + '/' + database.collection + '/' + database.id;       
    return this.http.post(`${url}`, products);
  };

  updateUniversalProduct(database, product) {
    let products = product;  
     
    var url = this.uri + '/universalProducts/update/' + database.name + '/' + database.collection + '/' + database.id;       
    return this.http.post(`${url}`, products);
    
  };

  deleteUniversalProduct(database) {
    var url = this.uri + '/universalProducts/delete/' + database.name + '/' + database.collection + '/' + database.id;       
    return this.http.get(`${url}`);
    
  };

  getDatabases() {
    
    return this.http.get(`${this.uri}/database/listdatabases/`);
  };

  getCollections(database) {
    
    return this.http.get(`${this.uri}/database/listcollections/${database}`);
  };

   createColletion(database, collection) {
    var url = this.uri + '/database/createcollection/' + database + '/' + collection;
    return this.http.get(`${url}`);
  };

  createDatabase(database, collection) {
    var url = this.uri + '/database/createdatabase/' + database + '/' + collection;
    return this.http.get(`${url}`);
  };

  deleteCollection(database, collection) {
    var url = this.uri + '/database/deletecollection/' + database + '/' + collection;    
    return this.http.get(`${url}`);
  };

  deleteDatabase(database) {
    var url = this.uri + '/database/deletedatabase/' + database;    
    return this.http.get(`${url}`);
  };


}
