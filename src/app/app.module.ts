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

import { PackListComponent } from './pack-list/pack-list.component';
import { PackAddComponent } from './pack-add/pack-add.component';
import { PackDetailComponent } from './pack-detail/pack-detail.component';
import { PackEditComponent } from './pack-edit/pack-edit.component';

import { BenefitListComponent } from './benefit-list/benefit-list.component';
import { BenefitAddComponent } from './benefit-add/benefit-add.component';
import { BenefitDetailComponent } from './benefit-detail/benefit-detail.component';
import { BenefitEditComponent } from './benefit-edit/benefit-edit.component';

import { SidebarComponent } from './sidebar/sidebar.component';

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
  {
    path: 'pack',
    component: PackListComponent,
    data: { title: 'Pack List' },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'pack/detail/:id',
    component: PackDetailComponent,
    data: { title: 'Pack Details' }
  },
  {
    path: 'pack/add',
    component: PackAddComponent,
    data: { title: 'Pack Add' }
  },
  {
    path: 'pack/edit/:id',
    component: PackEditComponent,
    data: { title: 'Pack Edit' }
  },
  {
    path: 'benefit',
    component: BenefitListComponent,
    data: { title: 'Benefit List' },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'benefit/detail/:id',
    component: BenefitDetailComponent,
    data: { title: 'Benefit Details' }
  },
  {
    path: 'benefit/add',
    component: BenefitAddComponent,
    data: { title: 'Benefit Add' }
  },
  {
    path: 'benefit/edit/:id',
    component: BenefitEditComponent,
    data: { title: 'Benefit Edit' }
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
    CustomerEditComponent,

    PackListComponent,
    PackAddComponent,
    PackDetailComponent,
    PackEditComponent,

    BenefitListComponent,
    BenefitAddComponent,
    BenefitDetailComponent,
    BenefitEditComponent,

    SidebarComponent
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
