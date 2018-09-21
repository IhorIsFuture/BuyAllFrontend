import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSliderModule, MatDialogModule, MatOptionModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
//import { ShopComponent } from './components/shop/shop.component';
import { ShopModule } from './components/shop/shop.module';
import { CartComponent } from './components/cart/cart.component';
import { CreateProductComponent } from './components/admin/create-product/create-product.component';
import { ListProductsComponent } from './components/admin/list-products/list-products.component';
import { DialogOverviewExampleDialog} from './components/admin/list-products/dialog-overview-example-dialog';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule }   from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from './product.service';
import { ProductComponent } from './components/product/product.component';
//import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login";




const routes: Routes = [
  { path: 'main', component: MainComponent },
  //{ path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin/create', component: CreateProductComponent },
  { path: 'admin/list', component: ListProductsComponent },
  { path: 'admin/edit', component: EditProductComponent },         
  { path: 'product/:database/:collection/:title', component: ProductComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];







/*export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        }
      ]
  );
  return config;
}*/

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    //ShopComponent,
    CartComponent,
    CreateProductComponent,
    ListProductsComponent,
    EditProductComponent,
    SearchPipe,
    DialogOverviewExampleDialog,
    ProductComponent,
   

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    FormsModule,
    MatToolbarModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSliderModule,
    MatDialogModule,
    ShopModule,
    //SocialLoginModule

  ],
  providers: [ProductService, CookieService
   /* {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }*/
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
