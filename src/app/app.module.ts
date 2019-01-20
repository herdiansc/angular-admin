import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const appRoutes: Routes = [
  {
    path: 'customer',
    component: CustomerListComponent,
    data: { title: 'Customer List' },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'customer/detail/:id',
    component: CustomerDetailComponent,
    data: { title: 'Customer Details' }
  },
  {
    path: 'customer/add',
    component: CustomerAddComponent,
    data: { title: 'Customer Add' }
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent,
    data: { title: 'Customer Edit' }
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerDetailComponent,
    CustomerEditComponent
  ],
  imports: [
  	RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
  	FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
