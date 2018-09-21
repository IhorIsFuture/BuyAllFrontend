
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

import { GetproductsComponent } from './getproducts/getproducts.component';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSliderModule, MatDialogModule, MatOptionModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule }   from '@angular/forms';


const routes: Routes = [
  { path: 'shop', component: ShopComponent},
  { path: 'shop/:database/:collection', component: ShopComponent}
  
  ]
  

@NgModule({
  declarations: [   
    GetproductsComponent,
   	ShopComponent     
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
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
    MatDialogModule   

  ],
  
  exports: [ RouterModule]
})
export class ShopModule { }